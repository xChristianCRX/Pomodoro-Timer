import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useEffect, useState } from "react";
import { differenceInSeconds} from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

/* interface NewCycleFormData{
  task: string
  minutesAmount: number
} */

interface Cycle{
  id:string
  task:string
  minutesAmount:number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    } 

    /* Sempre que o valor de um estado depender do valor anterior, usar arrow function */
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset();
  }

  function handleInterruptCycle(){
    setCycles(state => state.map((cycle) => {
      if(cycle.id == activeCycleId){
        return{ ...cycle, interruptedDate: new Date()}
      }else{
        return cycle
      }
    }))

    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, "0")
  const seconds = String(secondsAmount).padStart(2, "0")

  useEffect(() => {
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  }, [])

  const task = watch("task")

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

        <NewCycleForm />
        
        <Countdown 
          activeCycle={activeCycle} 
          setCycles={setCycles} 
          activeCycleId={activeCycleId}
        />

        { activeCycle ? (
          <StopCountdownButton onClick={handleInterruptCycle} type="button">
          <HandPalm size={24} />
          Interromper
        </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={!task}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        ) }

      </form>
    </HomeContainer>
  )
}
