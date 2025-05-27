import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Perfil'
      desc='Esse é como outros verão você no site.'
    >
      <ProfileForm />
    </ContentSection>
  )
}
