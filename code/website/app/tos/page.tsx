import { Metadata } from 'next';
import Link from 'next/link';
import { siteName, siteUrl } from '../../repositories/site';
import meta from '../meta.json';

const title = `Terms Of Service - ${siteName}`;
const description =
  'This page is our Terms Of Service. Please refer to the information in this page for any details regarding how to use this website.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${siteUrl}/privacy`,
    description,
    siteName: siteName,
    title,
    images: [meta.logo],
  },
};

const Page = () => {
  return (
    <div className="w-full sm:w-2/3 mx-auto">
      <h1 className="text-3xl font-bold pb-5">
        Terms and conditions for {siteName}
      </h1>
      This terms and conditions (terms and conditions) explains how{' '}
      <Link className="text-primary-link" href={siteUrl}>
        {siteName}
      </Link>{' '}
      can be used.
      <span className="block p-5 bg-black mt-10">
        THE SOFTWARE/WEBSITE IS PROVIDED &#34;AS IS&#34;, WITHOUT WARRANTY OF
        ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
        WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
        LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
        OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
        WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </span>
    </div>
  );
};

export default Page;
