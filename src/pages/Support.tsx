import { makeStyles, Theme } from '@material-ui/core/styles'
import React from 'react'

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
    padding: spacing(3)
  }
}))

const Support: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1 className="display-3">Support</h1>
      <p>
        Candy canes lemon drops cake chocolate caramels biscuit cake
        gingerbread. Icing pie macaroon chupa chups gummies tart sugar plum bear
        claw. Gummi bears sweet roll pudding.
      </p>
      <p>
        Dragée fruitcake caramels liquorice sweet. Tiramisu soufflé lemon drops
        chupa chups halvah toffee pastry. Chocolate bar brownie caramels
        caramels candy canes. Marshmallow sweet roll chocolate bar dragée oat
        cake.
      </p>
      <p>
        Candy canes lemon drops cake chocolate caramels biscuit cake
        gingerbread. Icing pie macaroon chupa chups gummies tart sugar plum bear
        claw. Gummi bears sweet roll pudding.
      </p>
      <p>
        Dragée fruitcake caramels liquorice sweet. Tiramisu soufflé lemon drops
        chupa chups halvah toffee pastry. Chocolate bar brownie caramels
        caramels candy canes. Marshmallow sweet roll chocolate bar dragée oat
        cake.
      </p>
    </div>
  )
}

export default Support
