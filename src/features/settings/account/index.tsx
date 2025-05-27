import ContentSection from '../components/content-section'
import { AccountForm } from './account-form'

export default function SettingsAccount() {
  return (
    <ContentSection
      title='Conta'
      desc='Atualize suas configurações de conta. Defina seu idioma e fuso horário.'
    >
      <AccountForm />
    </ContentSection>
  )
}
