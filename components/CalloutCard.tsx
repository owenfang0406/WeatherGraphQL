"use client"

import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/solid"
import { Callout } from "@tremor/react"
type Props = {
  message: string
  warning?: boolean
}

function CalloutCard({ message, warning }: Props) {
  return (
    <Callout
      title={message}
      icon={warning ? ExclamationCircleIcon : CheckCircleIcon}
      color={warning ? "rose" : "teal"}
    ></Callout>
  )
}

export default CalloutCard
