import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { cpfIsValid, dateIsValid } from "../utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-val", "CPF inválido", (v) => cpfIsValid(v)),
  email: yup
    .string()
    .email("E-mail inválido")
    .nullable()
    .transform((v) => (v === "" ? null : v)),
  dataNascimento: yup
    .date()
    .required("Data de nascimento é obrigatória")
    .typeError("Data inválida")
    .test("date-val", "Data inválida", (v) => dateIsValid(v)),
});

export default function PersonForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (id) {
      api
        .get(`/Pessoa/${id}`)
        .then((res) => {
          const p = res.data;
          setValue("nome", p.nome);
          setValue("sexo", p.sexo);
          setValue("email", p.email || "");
          setValue(
            "dataNascimento",
            p.dataNascimento ? p.dataNascimento.split("T")[0] : ""
          );
          setValue("naturalidade", p.naturalidade);
          setValue("nacionalidade", p.nacionalidade);
          setValue("cpf", p.cpf);
        })
        .catch(() => alert("Erro ao carregar registro"));
    }
  }, [id, setValue]);

  async function onSubmit(data) {
    try {
      const token = localStorage.getItem("token"); 

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

      if (id) {
        await api.put(`/Pessoa/${id}`, data, config);
      } else {
        await api.post("/Pessoa", data, config);
      }
      navigate("/");
    } catch (err) {
      alert("Erro ao salvar: " + (err.response?.data?.message || err.message));
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>{id ? "Editar" : "Novo"} cadastro</h2>

      <label>Nome *</label>
      <input {...register("nome")} />
      <p className="field-error">{errors.nome?.message}</p>

      <label>Sexo</label>
      <select {...register("sexo")}>
        <option value="">—</option>
        <option value="M">Masculino</option>
        <option value="F">Feminino</option>
        <option value="O">Outro</option>
      </select>

      <label>E-mail</label>
      <input {...register("email")} />
      <p className="field-error">{errors.email?.message}</p>

      <label>Data de Nascimento *</label>
      <input type="date" {...register("dataNascimento")} />
      <p className="field-error">{errors.dataNascimento?.message}</p>

      <label>Naturalidade</label>
      <input {...register("naturalidade")} />

      <label>Nacionalidade</label>
      <input {...register("nacionalidade")} />

      <label>CPF *</label>
      <input {...register("cpf")} />
      <p className="field-error">{errors.cpf?.message}</p>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          Salvar
        </button>
        <button type="button" onClick={() => navigate("/")} className="btn">
          Cancelar
        </button>
      </div>
    </form>
  );
}
