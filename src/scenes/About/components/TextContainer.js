import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components/macro"

const Container = styled.div`
  overflow-y: auto;
  padding: 25px 0;
`

const Title = styled.h2`
  font-family: proxima-nova, sans-serif;
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0.25em 0 0;
  text-transform: uppercase;
  letter-spacing: 1.7px;
`

const Text = styled.p`
  font-family: proxima-nova, sans-serif;
  font-weight: 200;
  font-size: 1.1rem;
  margin: 0.25em 0;
  line-height: 1.45em;
`

export default function TextContainer(props) {
  const { setScrollPerc, ...restProps } = props

  // update scroll percentage
  const [setup, setSetup] = useState(false)
  const scrollContainer = useRef()
  useEffect(() => {
    if (!setup || !scrollContainer || !scrollContainer.current) {
      scrollContainer.current.addEventListener("scroll", e => {
        const elem = e.target
        const maxScroll = elem.scrollHeight - elem.offsetHeight
        const perc = elem.scrollTop / maxScroll
        setScrollPerc(perc)
      })
      setSetup(true)
    }
  }, [setScrollPerc, setup])

  return (
    <Container {...restProps} ref={scrollContainer}>
      <Title>Bio</Title>
      <Text>
        Since I was 16, I've spent my time finding the intersection between art,
        technology, and business. I started making websites
      </Text>
      <br />
      <br />
      <Title>Statement</Title>
      <Text>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </Text>
    </Container>
  )
}
