import React, { useState, useEffect } from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import CustomButton from "./CustomButton"
import axios from "axios"

const IdeaCreateForm = ({ createIdeaIsOpen, createIdeaOnClose }) => {
  const initialRef = React.useRef()
  const finalRef = React.useRef()
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [solvedProblem, setSolvedProblem] = useState()

  const HandleCreate = async () => {
    let token = JSON.parse(localStorage.getItem("token"))

    let config = {
      header: {
        Authorization: token,
      },
      body: {
        title,
        description,
        solvedProblem,
      },
    }
    let response = await axios.post(
      "https://ideas-iq.herokuapp.com/api/ideas",
      config
    )
    console.log(response)
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={createIdeaIsOpen}
        onClose={createIdeaOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Problems that you are trying to solve</FormLabel>
              <Textarea
                value={solvedProblem}
                onChange={(e) => setSolvedProblem(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button onClick={createIdeaOnClose}>Cancel</Button>
            <CustomButton label="Post Your Idea" onClick={HandleCreate} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default IdeaCreateForm