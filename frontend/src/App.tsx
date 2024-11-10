
function App() {

  return (
    <>
        <main className="max-w-4xl mx-auto flex gap-5 px-4">
            <div className="py-8 flex flex-col justify-center pl-4" >
                <h1 className="text-4xl font-bold">Turn Any <span className="text-5xl bg-gradient-to-br from-emerald-500 from-30% to-sky-500 bg-clip-text text-transparent">URL into an Amazing Video</span> with Just One Click!</h1>
                <p className="mt-5 text-2xl mb-5">Effortlessly transform web content into engaging videos using cutting-edge AI technology—no
                    experience needed!</p>
                <form className=" grid gap-4">
                    <input className="bg-transparent border-2 rounded-full p-2" type="url" name="" id="" placeholder="https://"/>
                    <button className="bg-emerald-500 focus:outline-0  p-2 rounded-full uppercase text-xl font-medium" type="submit">Create&nbsp;Video</button>
                </form>
            </div>
            <div className="p-8">
                <div className="bg-gray-200 w-[360px] h-[512px] rounded-3xl p-5">
                    a
                </div>
            </div>
        </main>

    </>
  )
}

export default App
