import React, { Fragment } from 'react'
import { clone, find } from 'lodash'
import { useQuery } from '@apollo/client'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
// import Button from '@material-ui/core/Button'
// import { ArrowDownward } from '@material-ui/icons'
// import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import Pagination from '@material-ui/lab/Pagination'
import CoinItem from './CoinItem'
import HeaderFabButtons from './HeaderFabButtons'
import { GET_COINS, GET_COUNT } from '../../graphql/queries'
import useGlobal from '../../common/globalStateHook'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.typography.pxToRem(theme.spacing(3)),
    [theme.breakpoints.only('xs')]: {
      padding: theme.typography.pxToRem(theme.spacing(1.5))
    }
  },
  title: {
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center'
    }
  },
  buttonLoadMore: {
    margin: '0 auto'
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  buttonProgress: {
    color: green[100],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  bottomListWrapper: {
    position: 'relative',
    textAlign: 'center',
    margin: theme.spacing(1)
  },
  pagination: {
    textAlign: 'center',
    margin: '1.7rem 2rem 1.5rem 2rem'
  }
}))

const CoinsList = () => {
  const classes = useStyles()
  const [globalState, globalActions] = useGlobal()
  const { data: dataCount } = useQuery(GET_COUNT)
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_COINS, {
    fetchPolicy: 'cache-first',
    variables: {
      // offset: 0,
      // limit: 30,
      term: globalState.coinPageNeedle
    }
  })

  const coins = getListSlice(data, globalState.coinListPage, 30)

  const coinsTotal =
    dataCount && dataCount.count
      ? find(dataCount.count, { name: 'markets' }).count
      : 0

  const updateNeedle = (needle) => {
    globalActions.updateCoinPageNeedle(needle)
    refetch()
  }

  // const onLoadMore = () => {
  //   fetchMore({
  //     variables: {
  //       offset: data && coins.length,
  //       limit: 30
  //     }
  //   })
  // }

  const handleChange = (event, value) => {
    globalActions.setCoinListPage(value)

    // fetchMore({
    //   variables: {
    //     offset: 30 * (value - 1),
    //     limit: 30
    //   }
    // })
  }

  // const showLoadMoreButton =
  //   data &&
  //   coins.length < coinsTotal &&
  //   networkStatus !== 4 &&
  //   !globalState.coinPageNeedle

  const showPagination = !globalState.coinPageNeedle.length

  const paginationPages = Math.floor(coinsTotal / 30)

  return (
    <Fragment>
      <HeaderFabButtons
        loading={loading}
        coinPageNeedle={globalState.coinPageNeedle}
        updateNeedle={updateNeedle}
      />
      {error && <Typography>Error! {error.message}</Typography>}
      {coins && !coins.length && networkStatus === 7 && (
        <Typography variant="subtitle1">No results...</Typography>
      )}
      {loading && (!coins || networkStatus === 4) && (
        <Typography variant="subtitle2">Loading coins list...</Typography>
      )}
      {networkStatus !== 4 && coins && (
        <List>
          {coins.map((coin, ix) => {
            return coin && <CoinItem key={`${coin.name}${ix}`} coin={coin} />
          })}
        </List>
      )}

      {showPagination && (
        <div className={classes.pagination}>
          <Pagination
            count={paginationPages}
            size="large"
            color="primary"
            page={globalState.coinListPage}
            defaultPage={1}
            siblingCount={6}
            onChange={handleChange}
            className="pagination-coins-list"
          />
        </div>
      )}

      {/* {showLoadMoreButton && (
        <div className={classes.bottomListWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonLoadMore}
            onClick={onLoadMore}
            disabled={loading}
          >
            Load more
            <ArrowDownward className={classes.rightIcon} />
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </div>
      )} */}
    </Fragment>
  )
}

export default CoinsList

function getListSlice(data, page, limit) {
  const offset = (page - 1) * limit
  const list = data ? clone(data.coins) : []

  return list.splice(offset, limit)
}
