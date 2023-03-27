import { Check, X } from 'lucide-solid'
import { Component, Show, JSX, createMemo } from 'solid-js'
import Button from './Button'

interface Props {
  title?: string | JSX.Element
  show: boolean
  children: JSX.Element
  close: () => void
  footer?: JSX.Element
  maxWidth?: 'full' | 'half'
  fixedHeight?: boolean
  onSubmit?: (ev: Event & { currentTarget: HTMLFormElement }) => void
}

const Modal: Component<Props> = (props) => {
  let ref: any
  const width = createMemo(() => {
    if (!props.maxWidth) return `sm:max-w-lg`

    return props.maxWidth === 'full' ? `sm:w-[calc(100vw-64px)]` : 'sm:w-[calc(50vw)]'
  })

  const minHeight = createMemo(() => (props.fixedHeight ? `min-h-[calc(90vh-132px)]` : ''))

  const defaultSubmit = (ev: Event) => {
    ev.preventDefault()
  }

  return (
    <Show when={props.show}>
      <div class="fixed inset-x-0 top-0  items-center justify-center px-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div class="fixed inset-0 -z-10 opacity-40 transition-opacity">
          <div class="absolute inset-0 bg-black" />
        </div>
        <div class="flex h-screen items-center">
          <form
            ref={ref}
            onSubmit={props.onSubmit || defaultSubmit}
            class={`my-auto max-h-[90vh] w-[calc(100vw-16px)] overflow-hidden rounded-lg bg-[var(--bg-900)] shadow-md shadow-black transition-all ${width()} `}
          >
            <div class="flex flex-row justify-between p-4 text-lg font-bold">
              <div>{props.title}</div>
              <div onClick={props.close} class="cursor-pointer">
                <X />
              </div>
            </div>

            {/* 132px is the height of the title + footer*/}
            <div class={`max-h-[calc(90vh-132px)] ${minHeight()} overflow-y-auto p-4 text-lg`}>
              {props.children}
            </div>

            <Show when={props.footer}>
              <div class="flex w-full flex-row justify-end gap-2 p-4">{props.footer}</div>
            </Show>
          </form>
        </div>
      </div>
    </Show>
  )
}

export default Modal

export const ConfirmModal: Component<{
  show: boolean
  close: () => void
  confirm: () => void
  message: string
}> = (props) => {
  const confirm = () => {
    props.confirm()
    props.close()
  }

  return (
    <Modal
      show={props.show}
      close={props.close}
      title="Confirmation"
      footer={
        <>
          <Button schema="secondary" onClick={props.close}>
            <X /> Cancel
          </Button>

          <Button onClick={confirm}>
            <Check /> Confirm
          </Button>
        </>
      }
    >
      <div class="mb-8 flex justify-center">{props.message}</div>
    </Modal>
  )
}
