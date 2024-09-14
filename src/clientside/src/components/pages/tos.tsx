import { useContext } from 'react';
import { ApplicationContext } from '../../context';
import Page from '../Page';

const TermOfUse = () => {
  const { siteName } = useContext(ApplicationContext);

  const title = `Terms and conditions for ${siteName}`;
  const articleContentElement = (
    <>
      THE SOFTWARE/WEBSITE IS PROVIDED &#34;AS IS&#34;, WITHOUT WARRANTY OF ANY
      KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
      MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
      NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
      DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
      OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
      USE OR OTHER DEALINGS IN THE SOFTWARE.
    </>
  );

  return (
    <Page
      title={title}
      articleContentElement={articleContentElement}
      bgColor="bg-black"
    ></Page>
  );
};

export default TermOfUse;
