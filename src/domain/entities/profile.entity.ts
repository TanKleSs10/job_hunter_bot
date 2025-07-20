import { UrlObject } from "url";
import { CreateProfileSchema } from "../dtos/schemas/profile";

export class ProfileEntity {
  constructor(
    public id: string,
    public name: string,
    public location: string,
    public minimumSalary: number,
    public keywords: string[], // Siempre usar string[] aquí
    public curriculumPath: string,
    public alertsEnabled: boolean = true,
    public searchFrequency: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
    public notificationChannel?: string | null | undefined,
    public discordWebhookUrl?: string | null | undefined,
  ) {}

  public static fromObj(obj: any): ProfileEntity {
    const result = CreateProfileSchema.safeParse(obj);

    if (!result.success) {
      throw new Error("Invalid fields Profile");
    }

    const {
      name,
      location,
      minimumSalary,
      keywords,
      curriculumPath,
      alertsEnabled = true,
      searchFrequency,
      notificationChannel,
      discordWebhookUrl,
    } = result.data;

    const normalizedKeywords: string[] = Array.isArray(keywords)
      ? keywords
      : typeof keywords === "string"
        ? (keywords as string).split(",").map((k) => k.trim())
        : [];

    const id = obj.id || crypto.randomUUID();
    const createdAt = obj.createdAt ? new Date(obj.createdAt) : new Date();
    const updatedAt = obj.updatedAt ? new Date(obj.updatedAt) : new Date();

    return new ProfileEntity(
      id,
      name,
      location,
      Number(minimumSalary),
      normalizedKeywords,
      curriculumPath,
      alertsEnabled,
      searchFrequency,
      createdAt,
      updatedAt,
      notificationChannel,
      discordWebhookUrl,
    );
  }
  /**
   * Para guardar en SQLite con Prisma, serializar a objeto compatible.
   */
  public toPersistence(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      minimumSalary: this.minimumSalary,
      keywords: this.keywords.join(","), // Serializamos como string
      curriculumPath: this.curriculumPath,
      alertsEnabled: this.alertsEnabled,
      searchFrequency: this.searchFrequency,
      notificationChannel: this.notificationChannel,
      discordWebhookUrl: this.discordWebhookUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
