import prompts from "prompts";

export type TemplateName = "product-launch" | "case-study" | "portfolio" | "blank";

export interface InitAnswers {
  template: TemplateName;
  projectName: string;
  createDir: boolean;
}

const TEMPLATE_CHOICES: { title: string; value: TemplateName }[] = [
  { title: "Product Launch page", value: "product-launch" },
  { title: "Case Study page", value: "case-study" },
  { title: "Portfolio page", value: "portfolio" },
  { title: "Blank scroll page", value: "blank" },
];

export async function askInitQuestions(): Promise<InitAnswers | null> {
  const answers = await prompts(
    [
      {
        type: "select",
        name: "template",
        message: "What would you like to scaffold?",
        choices: TEMPLATE_CHOICES,
      },
      {
        type: "text",
        name: "projectName",
        message: "Project name",
        initial: "my-scroll-app",
        validate: (value: string) =>
          value.trim().length > 0 ? true : "Project name is required",
      },
      {
        type: "confirm",
        name: "createDir",
        message: "Create a new directory for the project?",
        initial: true,
      },
    ],
    {
      onCancel: () => {
        return false;
      },
    }
  );

  if (!answers.template || !answers.projectName) {
    return null;
  }

  return answers as InitAnswers;
}
