import ContentSection from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export default function SettingsAppearance() {
  return (
    <ContentSection
      title='Aparência'
      desc='Personalize a aparência do aplicativo. Alterna automaticamente entre temas de dia e noite.' 
    >
      <AppearanceForm />
    </ContentSection>
  )
}
