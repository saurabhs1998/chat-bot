export const addData = () => {
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
    {
      Q: "Do I need to submit a hard copy of my report?",
      A: `Yes, you need to bring "Spiral Binding Hard Copy“ of your prepared report to the presentation venue.`,
    },
    {
      Q:
        "My Company/Training Organization will not Provide “Training Completion Certificate” before my Viva/Presentation Date. What Should I do?",
      A:
        "You can put forward request to cse.tpc@lpu.co.in stating the reason for non-availability of training completion certificate. After analyzing your request, you may be granted an extension to submit the certificate. You will be informed through mail regarding approval of your request (if granted). Along with an undertaking for non-availability of certificate which you need to submit through email to cse.tpc@lpu.co.in .",
    },
    {
      Q:
        "I am a B.Tech (Lateral Entry) Student, in which training course shall I be allowed to do my 4-6 weeks summer training ?",
      A:
        "You can pick any of the summer training course between “Niche Technologies” or “Programming Course”. All other terms and conditions remains sam as applicable to other students.",
    },
    {
      Q:
        "I was supposed to do my summer training in C/C++ ,but I have done my summer training in some other technology (offline/Online), Will my summer training be evaluated ?",
      A:
        "As your were supposed to do your summer training in C/C++ (Due to your grades less than “B” in C and C++ courses) In case you have done your summer training other than C/C++ ( Either Offline or Online), Your training will not be evaluated & 'R' grade will be awarded to you in the summer training course.",
    },
    {
      Q:
        " I was supposed to do my summer training in niche technologies (Other than C/C++ ),but I have done my summer training in C/C++ (Offline/Online), will my summer training be evaluated ?",
      A:
        " As your were supposed to do your summer training in niche technologies due to your grades higher than “B” in C and C++ courses, In case you have done your summer training in C/C++ ( Either Offline or Online), Your training will not be evaluated & 'R' grade will be awarded to you in the summer training course.",
    },
    {
      Q:
        "Online Course/Nanodegree opted by me is not there in the list of approved courses, Will my summer training be evaluated ?",
      A:
        "In case you have done your summer training in course other than approved Online courses/Nanodegrees, Your training will not be evaluated & 'R' grade will be awarded in the summer training course.",
    },
    {
      Q: "When my Summer Training Viva will be held?",
      A:
        "Your summer training viva dates will be released by examination department. It will be updated within few days.Most probably it will be conducted after 20th of July 2019",
    },
    {
      Q: `Is presentation must for viva ?`,
      A:
        "Yes, you need to prepare powerpoint presentation for your viva.You will not be allowed to give your viva without powerpoint presentation.",
    },
    {
      Q: ` What will happen if :
      a) I will not be able to provide Training Certificate even after submission of undertaking (As per Question-7 of FAQs)?
      b) I will not be able to complete my course before 20th July 2019 or before my viva date?
      `,
      A: `In both the aforesaid cases student will be awarded "R"  in the summer training course.`,
    },
    {
      Q: `What will happen if I will be awarded "R" grade in my summer training course?`,
      A: `You should try to clear this course in the first attempt, however "R" grade in the summer training course will be considered as a "Reappear". You will get only one chance to clear this "Reappear" after paying 1000/- rupees ( or as per examination rules and regulations of university). For that, you will have to register for reappear like any other regular course.Your viva for the registered reappear will be conducted in the month of January/February 2020 ( or As per the dates released by Division of Academic Affairs)

        All other implications like any kind of scholarship, academic honor & awards, etc. will be applicable based upon your results in the summer training course as per university policies, rules and regulations.
        `,
    },
    {
      Q: "What are the parameters for my Summer Training Evaluation?",
      A: `Your presentation will be evaluated based upon following parameters :
        (*max. marks here in the aforesaid image represent the total weightage of the respective component from 100 marks)
        `,
    },
    {
      Q:
        "I have applied for Recommendation/Reference letter. When can I collect the letter?",
      A:
        "You can collect the letter within 3 working days from the date of applying in 34-201.",
    },
    {
      Q:
        "What is the last date for submission of summer training course opted?",
      A:
        "The Last date for submission of summer training course opted is 30th April 2019. This date is extended till 4th May 2019.",
    },
    {
      Q: "What are the dates for evaluation of my 4-6 Weeks Summer Training?",
      A:
        "Tentative date for the evaluation of 4-6 Weeks Summer Training is 25th-27th July 2019.",
    },
  ];
  ref
    .doc("Q&A")
    .set({ data: arr })
    .then(() => {
      console.log("done");
    })
    .catch((err) => {
      console.log(err);
    });
};
