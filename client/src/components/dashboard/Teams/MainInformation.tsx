import { Button } from '@/components/Interactions/Button'
import Input from '@/components/Interactions/Forms/Input'
import { on } from 'events'
import React from 'react'

export default function TeamMainInformation(props: any) {
  return (
    <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => props.handleSubmit(e)}
          className="flex flex-col w-full max-w-[800px] rounded-xl p-6 gap-4 shadow-sm bg-white"
        >
          <div className="flex w-full">
            <span className="text-2xl font-bold text-dark-500">
              Main information
            </span>
          </div>

          <div className="flex flex-row w-full flex-1 flex-wrap gap-8">
            <div className="flex flex-col w-[200px] gap-4 justify-between">
              <div className="w-full flex items-start aspect-square flex-1">
                <div className="w-full rounded-xl aspect-square bg-accent-500" />
              </div>
              <Input placeholder="#color" borders name={"color"} />
            </div>

            <div className="flex flex-1 flex-col gap-4 justify-start">
              <span className="text-xl font-semibold text-dark-500">Name</span>
              <Input placeholder="..." borders name={"name"} />
              <span className="text-xl font-semibold text-dark-500">
                Description
              </span>
              <Input placeholder="..." borders name={"description"} />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <Button
              className=""
              variant="accent"
              size="md"
              rounded="lg"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
  )
}
