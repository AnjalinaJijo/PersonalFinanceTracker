import Image from "next/image"

export default function Homepage() {
  return (
    <div className="flex-col p-20">
        <div className="flex justify-between font-serif">
        <div className="flex-col justify-center items-center w-1/2">

        <h1 className="text-4xl font-bold">Budget <span className="text-blue-400">Better,</span> Live <span className="text-blue-400">Bolder</span></h1>
        <p className="mt-7 text-xl"> Our cutting-edge finance tracker is designed to simplify the complexities of money management,
             providing you with the tools you need to navigate your financial journey with confidence.
              Whether you're looking to track expenses, set budgets, or gain insightful reports,
               we've got you covered. </p>
        <div className="flex justify-center item-center p-10">
            <button className="bg-LiserianPurple hover:bg-pearlyPurple hover:scale-110 p-5 w-40% rounded-xl text-2xl transition-all ease-in-out duration-300">Start Now</button>
        </div>
        </div>
        <div className="flex justify-center item-center"> 
            <Image className='animate-bounce-slow' src='/Coin.png' alt='coin' width={500} height={500}/>
        </div>
        </div>

    </div>
  )
}


//credits coin image
//<a href="https://www.freepik.com/free-photo/gold-coin-dollar-canada-currency-money-icon-sign-symbol-business-financial-exchange-3d-background-illustration_31128781.htm#query=coin&position=0&from_view=search&track=sph&uuid=2f07fa7f-5f0e-4724-8fe3-a146f2e2f727">Image by mamewmy</a> on Freepik

