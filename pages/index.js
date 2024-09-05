import Head from "next/head";
import GameCanvas from "../components/GameCanvas";

export default function Home() {
  return (
    <>
      <Head>
        <title>React Three Game</title>
        <meta name="description" content="React Three Game" />
      </Head>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-full h-full md:w-1/2 lg:w-1/3 bg-gray-800 rounded-lg shadow-lg">
          <GameCanvas />
        </div>
      </div>
    </>
  );
}
