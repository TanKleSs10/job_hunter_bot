import inquirer from "inquirer";

export const mainMenuPrompt = async () => {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "¿Qué deseas hacer?",
      choices: [
        { name: "Usar un perfil existente", value: "use" },
        { name: "Crear un nuevo perfil", value: "create" },
        { name: "Editar un perfil", value: "edit" },
        { name: "Salir", value: "exit" },
      ],
    },
  ]);

  return action;
};
