import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next'

export interface Renderers<U = object> {
  getInitialProps?: (props: { ctx: GetServerSidePropsContext }) => Partial<U> | Promise<Partial<U>>
  getStaticProps?: (props: { ctx: GetStaticPropsContext }) => Partial<U> | Promise<Partial<U>>
  getServerSideProps?: (props: { ctx: GetServerSidePropsContext }) => Partial<U> | Promise<Partial<U>>
}
