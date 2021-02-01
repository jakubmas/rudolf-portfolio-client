import React from 'react'
import { ImageContainer } from '../components/ui/ImageContainer'
import { LayoutBorder } from '../components/ui/LayoutBorder'
import { SideContentContainer } from '../components/ui/SideContentContainer'
import { LayoutCenterItem, LayoutContainer } from '../containers/Layout'


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
