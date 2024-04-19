import Link from 'next/link'
import { Metadata } from 'next'
import meta from '../meta.json'

const title = `Privacy Policy - ${meta.siteName}`
const description =
  'This page is our Privacy Policy. Please refer to the information in this page for any details regarding how this website protects your information.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${meta.siteUrl}/privacy`,
    description,
    siteName: meta.siteName,
    title,
    images: [meta.logo],
  },
}

const Page = () => {
  return (
    <div className="w-full sm:w-2/3 mx-auto bg-black p-5">
      <h1 className="text-3xl font-bold pb-5">Privacy Policy for {meta.siteName}</h1>
      This Privacy Statement (Privacy Statement) explains how{' '}
      <Link href={meta.siteUrl}>{meta.siteName}</Link> uses personal information
      and applies to all new users who register on our site. Please read this
      Privacy Statement carefully and feel free to review our summary of change,
      but any changes will be posted and changes will only apply to activities
      and information on a going forward, not retroactive basis. You are
      encouraged to review the privacy statement whenever you visit the Website
      to make sure that you understand how any personal information you provide
      will be used. If you not agree to our practices, please do not register,
      subscribe, create an account or otherwise interact with{' '}
      <Link href={meta.siteUrl}>{meta.siteName}</Link>
      <br />
      Note : the privacy statement set forth in this privacy statement are for
      this Website only. If you link to other Website, please review the privacy
      statement posted at those sites.
      <h2 className="text-2xl font-bold pt-5 pb-2">
        Collection and Use of Personal Information of every users
      </h2>
      When you visit <Link href={meta.siteUrl}>{meta.siteName}</Link>, we require
      you to provide us with identifiable information including your email
      addresses; in some cases we also request your name, gender, age and so on.
      This information is only used to fulfill your specific request and to
      contact you and to add you one of our mailing lists to send new promotion
      updated on the website. You can cancel the request on update alert e-mail
      at any time.
      <Link href={meta.siteUrl}>{meta.siteName}</Link> uses this information to
      give you a customized experience and enable us to response to customersâ€™
      requirements better.
      <br />
      <Link href={meta.siteUrl}>{meta.siteName}</Link> collects some basic
      non-identifying information. This specifically includes information
      regarding your operation system, browser software, and IP (Internet
      Protocol ) address. The information is collected in order to provide you a
      satisfactory service. <Link href={meta.siteUrl}>{meta.siteName}</Link>
      may use the information to detect problems with our server and to
      administer our website.
      <h2 className="text-2xl font-bold pt-5 pb-2">
        Disclosure of Personal Information
      </h2>
      <Link href={meta.siteUrl}>{meta.siteName}</Link> does not and will not
      provide or sell your personal information to any third party for
      independent use. Further, we will not disclose your personal information
      to external organizations unless:
      <ol>
        <li>
          The disclosure otherwise is lawfully permitted or required.{' '}
          <Link href={meta.siteUrl}>{meta.siteName}</Link>
          may be required, just for example, to disclose information about our
          customers. When <Link href={meta.siteUrl}>{meta.siteName}</Link>
          is required by a subpoena or court order.{' '}
          <Link href={meta.siteUrl}>{meta.siteName}</Link> may also be required to
          share this information with governmental regulatory authorities as
          authorized by applicable law.
        </li>
        <li>
          <Link href={meta.siteUrl}>{meta.siteName}</Link> may disclose Personal
          Data to protect ourselves against liability, to respond to subpoenas,
          judicial processes, legitimate requests by law enforcement officials,
          or as otherwise required in order to comply with applicable law, or to
          the purchasers in connection with any sale, assignment, or other
          transfer of all or a part of our business or company. We may also
          disclose Personal Information to enforce or apply the terms and
          conditions applicable to our products and services, or to protect the
          rights, property or safety of{' '}
          <Link href={meta.siteUrl}>{meta.siteName}</Link>, our users, or others.
        </li>
      </ol>
      <br />
      Note: In the situations described above, the personal information is
      protected to the Thai laws.
      <h2 className="text-2xl font-bold pt-5 pb-2">
        Commitment to Personal Data Security
      </h2>
      Your personally identifiable information is kept secure. Only authorized
      employees, agents and contactors (who have agreed to keep information
      secure and confidential) will have access to this information. You can
      cancel the request on update alert e-mail at any time.
      <h2 className="text-2xl font-bold pt-5 pb-2">
        Our Policy Concerning Cookies
      </h2>
      To serve you faster and with better quality,{' '}
      <Link href={meta.siteUrl}>{meta.siteName}</Link> uses &#34;cookies&#34;
      technology on our Site. Cookies are small bits of code, usually stored on
      a user&#39;s computer hard drive, which enable a web site to
      &#34;personalize&#34; itself for each user by remembering information
      about the user&#39;s visit to the web site. Cookies can store a variety of
      information, including IP addresses, navigational data, server
      information, data transfer times, user preferences, and e-mail addresses
      and passwords needed to access the Site. The &#34;Help&#34; section of the
      toolbar on most Internet browsers will tell you how to prevent your
      browser from accepting new cookies or how to configure your browser to
      reject cookies altogether. If you disable cookies, you might not be able
      to access important functions or features of this Site and your use of the
      Site may be limited. The cookies used on this Site are associated with a
      user&#39;s Personal Information.
      <h2 className="text-2xl font-bold pt-5 pb-2">Links to Other Websites</h2>
      <Link href={meta.siteUrl}>{meta.siteName}</Link> contains links to other
      websites, <Link href={meta.siteUrl}>{meta.siteName}</Link>
      is not responsible for the privacy practices and content of this
      third-party websites. <Link href={meta.siteUrl}>{meta.siteName}</Link>
      urges you to follow safe Internet practices: Do not supply personal
      information to these websites unless you have verified their security and
      privacy policies.
      <h2 className="text-2xl font-bold pt-5 pb-2">Your Consent</h2>
      By using our Website or opening an{' '}
      <Link href={meta.siteUrl}>{meta.siteName}</Link> account, you consent to the
      use of your personal information by{' '}
      <Link href={meta.siteUrl}>{meta.siteName}</Link> in the manner specified in
      the privacy statement. <Link href={meta.siteUrl}>{meta.siteName}</Link>,
      however, have the option to change, modify, or add to the term and
      condition of the privacy statement at any time. These changes will be
      posted on the site, to give you notice. Any customer who does not agree to
      the altered privacy statement has the option to sign-out or terminate user
      account.
      <h2 className="text-2xl font-bold pt-5 pb-2">
        Privacy Contact Information
      </h2>
      If you have any questions, concern, or comments about our privacy
      statement you may contact us.
    </div>
  )
}

export default Page
