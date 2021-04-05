export const addData = (common_ques) => {
  let arr = [
    {
      Q: "Is it mandatory to submit the training certificate?",
      A: "Yes, it is mandatory (for MOOCs as well as for the organization)",
    },
    {
      Q:
        "Is it mandatory to bring training certificate at the time of evaluation?",
      A: "Yes, it is mandatory (for MOOCs and for the organization)",
    },
    {
      Q:
        "I have done training on two different technologies. Which certificate should I submit?",
      A:
        "You need to submit only one certificate ( As per your submitted details in UMS Survey/Google Form ) and your evaluation will be based on that technology/Course only.",
    },
    {
      Q:
        "Do I need to submit a project or should I give a presentation on technology?",
      A:
        "You can either submit a project or can learn technology. A powerpoint presentation is must in both  cases.",
    },
    {
      Q: "I have made a project. Do I need to give a presentation or not?",
      A:
        "In both the cases (either project or technology) you need to give a presentation.",
    },
  ];
  common_ques
    .doc("Q&A")
    .set({ data: arr })
    .then(() => {
      console.log("done");
    })
    .catch((err) => {
      console.log(err);
    });
};
