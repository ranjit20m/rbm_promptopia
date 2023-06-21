import "@styles/globals.css";
import Provider from "@/components/Provider";
import Nav from "@components/Nav";
export const metadata = {
    title: 'Promptopia',
    description: 'Discover and share AI prompts'
};

const RootLayout = ({ children, session }) => {
  return (
    <html lang='en'>
        <body>
            <Provider session={session}>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">                    
                    <Nav />
                    {children}                                    
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;