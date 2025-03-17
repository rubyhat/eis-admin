import { z } from "zod";

/**
 * Схема валидации формы отклонения заявки.
 *
 * Проверяет корректность введённого значения:
 * - `reason` - строка от 10 до 255 символов.
 */
export const SellDetailsDeclineValidationSchema = z.object({
  /** Причина блокировки (обязательное поле) */
  reason: z
    .string()
    .min(10, { message: "Укажите причину! (Минимум 10 символов)" })
    .max(255, { message: "Слишком длинное сообщение" }),
});

/**
 * Тип данных, используемых в форме отклонения заявки.
 *
 * Автоматически выводится из `SellDetailsDeclineValidationSchema`.
 */
export type SellDetailsDeclineDataTypes = z.infer<
  typeof SellDetailsDeclineValidationSchema
>;
