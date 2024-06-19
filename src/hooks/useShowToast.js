import { useToast } from "@chakra-ui/react"

function useShowToast() {
    const toast = useToast()

    function showToast(title, description, status) {
        toast({
            title,
            description,
            status,
            duration: 9000,
            isClosable: true,
        })
    }

    return showToast
}

export default useShowToast
