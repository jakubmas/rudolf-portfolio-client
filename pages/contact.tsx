import React from 'react'
import { ImageContainer } from '../src/components/ui/ImageContainer'
import { LayoutBorder } from '../src/components/ui/LayoutBorder'
import { SideContentContainer } from '../src/components/ui/SideContentContainer'
import { LayoutCenterItem, LayoutContainer } from '../src/containers/Layout'


export default function ContactPage() {
  return (
    <LayoutContainer breakdownPoint="md">
      <LayoutCenterItem breakdownPoint="md" columnsNumber={7}>
        <ImageContainer
          srcImage="/assets/Contact-photo.png"
          altImage="About me photography"
        />
      </LayoutCenterItem>
      <LayoutCenterItem breakdownPoint="md" columnsNumber={5}>
        <LayoutBorder />
        <SideContentContainer containerWest iconsSection />
      </LayoutCenterItem>
    </LayoutContainer>
  )
}
