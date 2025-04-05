import { Button } from '@/components/ui/button'
import { CODY_PUBKEY } from '@/constants'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ZapDialog from '../ZapDialog'
import RecentSupporters from './RecentSupporters'

export default function Donation({ className }: { className?: string }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [donationAmount, setDonationAmount] = useState<number | undefined>(undefined)

  return (
    <div className={cn('p-4 border rounded-lg space-y-4', className)}>
      <div className="font-semibold text-center">{t('Enjoying 🅰️?')}</div>
      <div className="text-center text-muted-foreground">
        {t('Your donation helps me maintain 🅰️ and make it better! 😊')}
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { amount: 1000, text: '☕️ 1k' },
          { amount: 10000, text: '🍜 10k' },
          { amount: 100000, text: '🍣 100k' },
          { amount: 1000000, text: '✈️ 1M' }
        ].map(({ amount, text }) => {
          return (
            <Button
              variant="secondary"
              className=""
              key={amount}
              onClick={() => {
                setDonationAmount(amount)
                setOpen(true)
              }}
            >
              {text}
            </Button>
          )
        })}
      </div>
      <RecentSupporters />
      <ZapDialog
        open={open}
        setOpen={setOpen}
        pubkey={CODY_PUBKEY}
        defaultAmount={donationAmount}
      />
    </div>
  )
}
