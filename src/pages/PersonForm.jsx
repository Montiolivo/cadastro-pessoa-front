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
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (id) {
      api
        .get(`/Pessoa/${id}`,  {
        headers: { Authorization: `Bearer ${token}` },
      })
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
  }, [id, setValue, token]);

  async function onSubmit(data) {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

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
    <div className="form-page">
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <h2 className="form-title">{id ? "Editar" : "Novo"} Cadastro</h2>

        <label className="form-label">Nome *</label>
        <input {...register("nome")} className="form-input" />
        <p className="form-error">{errors.nome?.message}</p>

        <label className="form-label">Sexo</label>
        <select {...register("sexo")} className="form-select">
          <option value="">—</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
          <option value="O">Outro</option>
        </select>

        <label className="form-label">E-mail</label>
        <input {...register("email")} className="form-input" />
        <p className="form-error">{errors.email?.message}</p>

        <label className="form-label">Data de Nascimento *</label>
        <input type="date" {...register("dataNascimento")} className="form-input" />
        <p className="form-error">{errors.dataNascimento?.message}</p>

        <label className="form-label">Naturalidade</label>
        <input {...register("naturalidade")} className="form-input" />

        <label className="form-label">Nacionalidade</label>
        <input {...register("nacionalidade")} className="form-input" />

        <label className="form-label">CPF *</label>
        <input {...register("cpf")} className="form-input" />
        <p className="form-error">{errors.cpf?.message}</p>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
