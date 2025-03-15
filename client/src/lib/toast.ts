import { toast } from "sonner"


const popUpToast = (header: string, description: string) => {
  toast(header, {
      description: description,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
      duration: 2500,
     
  })
}

export default popUpToast