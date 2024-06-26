import { z } from "zod";

const RSchema = z.object({
    username: z
        .string()
        .nonempty("O nome de usuário é obrigatório.")
        .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
        .max(10, "O nome de usuário não pode ser maior que 10 caracteres."),

    email: z
        .string()
        .nonempty("O email é obrigatório.")
        .email("Digite um email válido."),

    password: z
        .string()
        .nonempty("O senha é obrigatória.")
        .min(4, "A senha deve ter pelo menos 8 caracteres."),

    confirmpassword: z
        .string()
        .nonempty("A confirmação de senha é obrigatória."),
});

const LSchema = z.object({
    email: z.string().email("Digite um email válido."),
    password: z.string().min(4, "A senha deve ter pelo menos 8 caracteres."),
});

const ESchema = z.object({
    username: z
        .string()
        .min(3, "O nome de usuário deve ter pelo menos 3 caracteres.")
        .max(10, "O nome de usuário não pode ser maior que 10 caracteres."),

    email: z.string().email("Digite um email válido."),

    password: z.string(),

    confirmpassword: z.string(),
});

export { RSchema, ESchema, LSchema };
