import Image from "next/image"

export default function Homepage() {
  return (

        <div className="flex lg:flex-row flex-col lg:justify-between justify-center font-serif p-5">
          
        <div className="flex-col justify-center items-center lg:w-1/2 lg:pl-20 p-7">

        <h1 className="lg:text-4xl text-2xl font-bold">Budget <span className="text-blue-400">Better,</span> Live <span className="text-blue-400">Bolder</span></h1>
        <p className="mt-7 lg:text-xl text-l"> Our cutting-edge finance tracker is designed to simplify the complexities of money management,
             providing you with the tools you need to navigate your financial journey with confidence.
              Whether you're looking to track expenses, set budgets, or gain insightful reports,
               we've got you covered. </p>
        <div className="flex  py-10">
            <button className="bg-LiserianPurple hover:bg-pearlyPurple hover:scale-90 p-3 rounded-xl lg:text-2xl text:xl transition-all ease-in-out duration-300">Start Now</button>
        </div>
        </div>
        <div className="flex justify-center item-center"> 
            <Image className='animate-bounce-slow' src='/Coin.png' alt='coin' width={500} height={500} />
            
        </div>
        </div>
  )
}

//credits coin image
//<a href="https://www.freepik.com/free-photo/gold-coin-dollar-canada-currency-money-icon-sign-symbol-business-financial-exchange-3d-background-illustration_31128781.htm#query=coin&position=0&from_view=search&track=sph&uuid=2f07fa7f-5f0e-4724-8fe3-a146f2e2f727">Image by mamewmy</a> on Freepik
//logo edit
//finbliss
//next.app.logomakr.com/9eNcD9


