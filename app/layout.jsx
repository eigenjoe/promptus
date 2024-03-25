import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";


export const metadata = {
    title: "Promptus",
    description: "Promptus is a simple and elegant way to create and share AI prompts.",
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                < div className="gradient" />
            </div>

            <main className="app">
                <Nav />
                { children } 
            </main>
        </body>

    </html>
  )
}

export default RootLayout;