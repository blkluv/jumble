import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useNostr } from '@/providers/NostrProvider'
import { useTheme } from '@/providers/ThemeProvider'
import { NstartModal } from 'nstart-modal'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AccountList from '../AccountList'
import BunkerLogin from './BunkerLogin'
import GenerateNewAccount from './GenerateNewAccount'
import NpubLogin from './NpubLogin'
import PrivateKeyLogin from './PrivateKeyLogin'
import { isDevEnv } from '@/lib/common'

type TAccountManagerPage = 'nsec' | 'bunker' | 'generate' | 'npub' | null

export default function AccountManager({ close }: { close?: () => void }) {
  const [page, setPage] = useState<TAccountManagerPage>(null)

  return (
    <>
      {page === 'nsec' ? (
        <PrivateKeyLogin back={() => setPage(null)} onLoginSuccess={() => close?.()} />
      ) : page === 'bunker' ? (
        <BunkerLogin back={() => setPage(null)} onLoginSuccess={() => close?.()} />
      ) : page === 'generate' ? (
        <GenerateNewAccount back={() => setPage(null)} onLoginSuccess={() => close?.()} />
      ) : page === 'npub' ? (
        <NpubLogin back={() => setPage(null)} onLoginSuccess={() => close?.()} />
      ) : (
        <AccountManagerNav setPage={setPage} close={close} />
      )}
    </>
  )
}

function AccountManagerNav({
  setPage,
  close
}: {
  setPage: (page: TAccountManagerPage) => void
  close?: () => void
}) {
  const { t } = useTranslation()
  const { themeSetting } = useTheme()
  const { nip07Login, bunkerLogin, nsecLogin, ncryptsecLogin, accounts } = useNostr()

  return (
    <div onClick={(e) => e.stopPropagation()} className="flex flex-col gap-8">
      <div>
        <div className="text-sm font-semibold text-center text-muted-foreground">
          {t('Add an Account')}
        </div>
        <div className="mt-4 space-y-2">
          {!!window.nostr && (
            <Button onClick={() => nip07Login().then(() => close?.())} className="w-full">
              {t('Login with Browser Extension')}
            </Button>
          )}
          <Button variant="secondary" onClick={() => setPage('bunker')} className="w-full">
            {t('Login with Bunker')}
          </Button>
          <Button variant="secondary" onClick={() => setPage('nsec')} className="w-full">
            {t('Login with Private Key')}
          </Button>
          {isDevEnv() && (
            <Button variant="secondary" onClick={() => setPage('npub')} className="w-full">
              Login with Public key (for development)
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <div>
        <div className="text-sm font-semibold text-center text-muted-foreground">
          {t("Don't have an account yet?")}
        </div>
        <Button
          onClick={() => {
            const wizard = new NstartModal({
              baseUrl: 'https://start.njump.me',
              an: 'ATL5D',
              am: themeSetting,
              onComplete: ({ nostrLogin }) => {
                if (!nostrLogin) return

                if (nostrLogin.startsWith('bunker://')) {
                  bunkerLogin(nostrLogin)
                } else if (nostrLogin.startsWith('ncryptsec')) {
                  ncryptsecLogin(nostrLogin)
                } else if (nostrLogin.startsWith('nsec')) {
                  nsecLogin(nostrLogin)
                }
              }
            })
            close?.()
            wizard.open()
          }}
          className="w-full mt-4"
        >
          {t('Sign up')}
        </Button>
        <Button
          variant="link"
          onClick={() => setPage('generate')}
          className="w-full py-0 mt-1 text-muted-foreground h-fit"
        >
          {t('or simply generate a private key')}
        </Button>
      </div>
      {accounts.length > 0 && (
        <>
          <Separator />
          <div>
            <div className="text-sm font-semibold text-center text-muted-foreground">
              {t('Logged in Accounts')}
            </div>
            <AccountList className="mt-4" afterSwitch={() => close?.()} />
          </div>
        </>
      )}
    </div>
  )
}
