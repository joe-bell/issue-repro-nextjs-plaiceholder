import Link from "next/link";

const Index = () => (
  <div>
    <h1>Next.js + Plaiceholder Issue Reproduction</h1>

    <ul>
      <li>
        Placeholders Generated Pre-Build
        <ul>
          <li>
            <Link href="/pre-build/css">
              <a>CSS</a>
            </Link>
          </li>
          <li>
            <Link href="/pre-build/base64">
              <a>Base64</a>
            </Link>
          </li>
        </ul>
      </li>

      <li>
        Placeholders Generated with getStaticProps
        <ul>
          <li>
            <Link href="/get-static-props/css">
              <a>CSS</a>
            </Link>
          </li>
          <li>
            <Link href="/get-static-props/base64">
              <a>Base64</a>
            </Link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
);

export default Index;
