"use client";
import React, { useState } from "react";
import classes from "@/styles/faq.module.css";
import { IoIosArrowForward } from "react-icons/io";

const Faqs = () => {
  const [currentOpen, setCurrentOpen] = useState(-1);

  const QUESTIONS = [
    {
      question: "What is a chatbot and how does it work?",
      answer:
        "A chatbot is a computer program designed to simulate conversation with human users, especially over the Internet. It works by using artificial intelligence algorithms to understand and respond to user queries in a human-like manner.",
    },
    {
      question: "How can a chatbot benefit my business?",
      answer:
        "Chatbots can benefit your business by providing instant customer support, automating repetitive tasks, increasing customer engagement, and improving overall efficiency. They can also help in lead generation, sales, and enhancing the user experience on your website or app.",
    },
    {
      question: "Is my data safe when using the chatbot?",
      answer:
        "Yes, your data security is our priority. We use encryption and secure protocols to protect your information. We do not store personal data shared during conversations, ensuring your privacy and confidentiality.",
    },
    {
      question: "Can I customize the chatbot to match my brand's identity?",
      answer:
        "Absolutely! Our chatbot can be customized to match your brand's colors, logo, and tone of voice. You can personalize the chatbot's responses to align with your brand guidelines, creating a seamless and cohesive user experience.",
    },
    {
      question: "How do I integrate the chatbot into my website or app?",
      answer:
        "Integrating our chatbot is simple. We provide easy-to-follow documentation and support to help you integrate the chatbot into your website or app. Whether you use WordPress, Shopify, or custom web development, our team is here to assist you at every step.",
    },
    {
      question:
        "What kind of support do you offer if I encounter issues with the chatbot?",
      answer:
        "We offer 24/7 technical support to assist you with any issues or queries related to the chatbot. Our dedicated support team is available via email, live chat, or phone to ensure that your experience with our chatbot is smooth and trouble-free.",
    },
  ];

  const handleChange = (index) => {
    if (currentOpen == index) setCurrentOpen(-1);
    else setCurrentOpen(index);
  };
  return (
    <div className={classes.container}>
      <h1>FAQ's</h1>
      <div className={classes.box}>
        <div className={classes.items}>
          {QUESTIONS.map((item, index) => {
            const questionContainerStyle = {
              paddingBottom: index === currentOpen ? "5rem" : "",
            };
            return (
              <div className={classes.item} key={index}>
                <div className={classes.question_container}>
                  <div className={classes.left}>
                    <div
                      className={classes.indexs}
                      style={questionContainerStyle}
                    >
                      {index < 9 ? "0" : ""}
                      {index}
                    </div>
                    <div
                      className={classes.question}
                      style={questionContainerStyle}
                    >
                      {item.question}
                    </div>
                  </div>
                  <div
                    className={`${classes.down_arrow} ${
                      index === currentOpen ? classes.rotate_button : ""
                    }`}
                    style={questionContainerStyle}
                    onClick={() => {
                      handleChange(index);
                    }}
                  >
                    <IoIosArrowForward />
                  </div>
                </div>
                {index === currentOpen && (
                  <div className={classes.answer}>{item.answer}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
