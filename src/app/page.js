import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <card>

      This is youtube api. Go to /api to use the feature.
      </card>
      <a href='/api?q=sample&max=0'>- Go -</a>
    </main>
  )
}
