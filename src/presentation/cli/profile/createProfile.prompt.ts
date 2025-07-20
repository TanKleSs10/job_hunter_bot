import inquirer from "inquirer";

export async function createProfilePrompt() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "¿Cuál es tu nombre?",
    },
    {
      type: "input",
      name: "email",
      message: "¿Correo electrónico?",
    },
    {
      type: "input",
      name: "location",
      message: "¿Ubicación para buscar trabajos?",
    },
    {
      type: "number",
      name: "minimumSalary",
      message: "¿Salario mínimo esperado (MXN)?",
    },
    {
      type: "input",
      name: "keywords",
      message: "Palabras clave separadas por comas (ej: React, Node, Remote)",
    },
    {
      type: "input",
      name: "curriculumPath",
      message: "Ruta al archivo de tu CV (PDF, etc):",
    },
    {
      type: "list",
      name: "searchFrequency",
      message: "¿Con qué frecuencia quieres buscar empleos?",
      choices: ["daily", "weekly", "manual"],
    },
    {
      type: "confirm",
      name: "alertsEnabled",
      message: "¿Quieres recibir alertas de nuevas vacantes?",
      default: true,
    },
    {
      type: "list",
      name: "notificationChannel",
      message: "¿Dónde quieres recibir notificaciones?",
      choices: ["none", "email", "discord"],
      filter: (val) => (val === "none" ? null : val),
    },
    {
      type: "input",
      name: "discordWebhookUrl",
      message: "URL del webhook de Discord:",
      when: (answers) => answers.notificationChannel === "discord",
    },
  ]);
  return answers;
}
