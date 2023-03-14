import React, { useCallback } from 'react'
import * as Linking from 'expo-linking'
import { Button, IButtonProps } from 'native-base'

interface Props extends IButtonProps {
  href: string
}

const LinkButton = ({ href, press, ...props }: Props) => {
  const handlePress = useCallback(() => {
    {press ? press : Linking.openURL(href)}
  }, [href])

  return <Button {...props} onPress={handlePress} />
}

export default LinkButton
