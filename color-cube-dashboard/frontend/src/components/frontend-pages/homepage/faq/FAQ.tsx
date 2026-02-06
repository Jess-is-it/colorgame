
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "src/components/ui/accordion"
import { Link } from 'react-router'

export const FAQ = () => {
  const Questions = [
    {
      key: "question1",
      question: "What is included with my purchase?",
      answer: "Tailor the dashboard to your exact needs. Customize layouts, color schemes, and widgets effortlessly for a personalized user experience."
    },
    {
      key: "question2",
      question: "Are there any recurring fees?",
      answer: "Unlock the true potential of your data with our advanced analytics tools. Gain valuable insights and make data-driven decisions with ease."
    },
    {
      key: "question3",
      question: "Can I use the template on multiple projects?",
      answer: "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis."
    },
    {
      key: "question4",
      question: "Can I customize the admin dashboard template to match my brand?",
      answer: "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis."
    },
    {
      key: "question5",
      question: "Are there any restrictions on using the template?",
      answer: "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis."
    },
    {
      key: "question6",
      question: "How can I get support after purchase?",
      answer: "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis."
    },
  ]
  return (
    <>
      <div className="max-w-[800px] mx-auto px-4 lg:pb-24 pb-20 pt-0" >
        <h3 className="md:text-40 text-32 font-bold text-link dark:text-white leading-tight text-center mb-14">Frequently asked questions</h3>
        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {Questions.map((item) => (
            <AccordionItem key={item.key} value={item.key}>
              <AccordionTrigger className="px-6 text-lg text-ld py-5 rounded-md">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-5 text-base text-ld opacity-80 leading-7 rounded-b-md">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-14 w-fit mx-auto py-1 px-2 rounded-md border-2 border-dashed border-border dark:border-darkborder text-sm font-medium justify-center text-lightmuted dark:text-darklink flex items-center flex-wrap gap-1">
          Still have a question ?
          <Link to="https://tailwind-admin.com/support" target="_blank" className="underline hover:text-primary" >Submit A Ticket</Link>
        </p>
      </div>
    </>
  )
}