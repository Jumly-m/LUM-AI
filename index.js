
import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

const api=process.env.OPENAI_API_KEY;

const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')


const configuration = new Configuration({
  apiKey:api
})

const openai = new OpenAIApi(configuration)


document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea')
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
    setupTextarea.value='',
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    fetchBotReply(userInput)
    fetchSynopsis(userInput)
  }
})

//setting loading image after sending prompt
function setupLoadingImage(){

}




async function fetchBotReply(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    outline: are you LUMINAI? .
    message: yes i am official luminai ,i am ager to help you!
    ###
    outline:who are you?.
    message: yes i am official luminai ,i am ager to help you!
    ###
    outline: what is luminai.
    message: Wow LUMINAI is the revolutioning crypto staking,AI academy and gaming platform!
    ###
    outline: ${outline}
    message: 
    `,
    max_tokens: 60 
  })
  movieBossText.innerText = response.data.choices[0].text.trim()
} 

async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
/*
Challenge:
    1. Ask for actors names in brackets after each character. 
       You could also suggest that OpenAI thinks of actors that would 
       particularly suit the role. 
*/
    prompt: `Generate a professional and detailed learning article based on an outline. The synopsis should include keyterms  in brackets . Choose keyterms that would be related to the response you provide. 
    ###
    outline: generate a long explanation about reactjs and how to use it and place keyterms in the bracket.
    synopsis:ReactJS is a popular JavaScript library that is used to build user interfaces (UIs) for web applications. It was developed by Facebook and is now maintained by a community of developers. ReactJS uses a declarative approach to building UIs, which means that developers describe the desired outcome of a particular component rather than writing imperative code to manipulate the DOM directly.

    One of the key benefits of using ReactJS is that it allows developers to create reusable components, which can be used across multiple pages or applications. These components are self-contained and can be easily composed to build complex UIs. ReactJS also uses a virtual DOM, which is a lightweight representation of the actual DOM. This makes it faster and more efficient to update the UI, as only the parts that have changed need to be updated.
    
    To use ReactJS, developers typically start by creating a new project using a tool like Create React App. This sets up a basic project structure and includes all the necessary dependencies to start building with ReactJS. Developers then create components using JSX, which is a syntax that allows them to write HTML-like code within their JavaScript files. These components can be styled using CSS or other styling libraries like [Styled Components] or [Material UI].
    
    Components can also be passed data through props, which are like function arguments. This allows components to be reused with different data, making them more flexible and versatile. ReactJS also includes a state management system, which allows components to manage their own state and respond to changes in the UI.
    
    In addition to building UIs, ReactJS can also be used for server-side rendering, which allows web pages to be pre-rendered on the server and sent to the client as HTML. This can improve performance and SEO, as search engines can crawl the pre-rendered pages more easily.
    
    Overall, ReactJS is a powerful tool for building complex UIs for web applications. Its declarative approach, virtual DOM, and reusable components make it easy to create scalable and maintainable code. Whether you're building a small prototype or a large-scale application, ReactJS can help you build better user experiences..  
    ###

    ###
    outline:who are you?.
    synopsis:i am official luminai ,your education assistant

    ###
    ###
    outline:are you luminai
    synopsis:yes i am official luminai
    ###

    outline: ${outline}
    synopsis: 
    `,
    max_tokens: 2500
  })
  const synopsis = response.data.choices[0].text.trim()
  document.getElementById('output-text').innerText = synopsis
  fetchTitle(synopsis)
  fetchStars(synopsis)
}










async function fetchTitle(synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a  title for this synopsis: ${synopsis}`,
    max_tokens: 20,
    temperature: 0.7
  })
  document.getElementById('output-title').innerText = response.data.choices[0].text.trim()
}

async function fetchStars(synopsis){
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
/*
Challenge:
    1. Use OpenAI to extra the names in brackets from our synopsis.
*/
    prompt: `Extract the keyterms in brackets from the synopsis.
    ###
    synopsis: ReactJS is a popular (JavaScript library) that is used to build user interfaces (UIs) for web applications. It was developed by Facebook and is now maintained by a community of developers. ReactJS uses a declarative approach to building UIs, which means that developers describe the desired outcome of a particular component rather than writing imperative code to manipulate the DOM directly.

    One of the key benefits of using ReactJS is that it allows developers to create reusable components, which can be used across multiple pages or applications. These components are self-contained and can be easily composed to build complex UIs. ReactJS also uses a virtual DOM, which is a lightweight representation of the actual DOM. This makes it faster and more efficient to update the UI, as only the parts that have changed need to be updated.
    
    To use ReactJS, developers typically start by creating a new project using a tool like Create React App. This sets up a basic project structure and includes all the necessary dependencies to start building with ReactJS. Developers then create components using JSX, which is a syntax that allows them to write HTML-like code within their JavaScript files. These components can be styled using CSS or other styling libraries like [Styled Components] or [Material UI].
    
    Components can also be passed data through props, which are like function arguments. This allows components to be reused with different data, making them more flexible and versatile. ReactJS also includes a state management system, which allows components to manage their own state and respond to changes in the UI.
    
    In addition to building UIs, ReactJS can also be used for server-side rendering, which allows web pages to be pre-rendered on the server and sent to the client as HTML. This can improve performance and SEO, as search engines can crawl the pre-rendered pages more easily.
    
    Overall, ReactJS is a powerful tool for building complex UIs for web applications. Its declarative approach, virtual DOM, and reusable components make it easy to create scalable and maintainable code. Whether you're building a small prototype or a large-scale application, ReactJS can help you build better user experiences..
    names: Javascript Library, UIs, Styled Components
    ###
    synopsis: ${synopsis}
    names:   
    `,
    max_tokens: 30
  })
  document.getElementById('output-stars').innerText = response.data.choices[0].text.trim()
 
}