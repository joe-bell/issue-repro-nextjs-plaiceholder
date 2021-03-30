import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImageFilePaths } from "@/lib/get-image-file-paths";
import { getImage } from "@plaiceholder/next";
import { getPixelsCSS } from "@plaiceholder/css";
import { Layout } from "@/components/layout";
import { grid, gridItem, gridItemPlaceholder } from "@/styles";

const getImagesAndPlaceholders = async () => {
  const images = getImageFilePaths();

  return Promise.all(
    images.map(async (path) => {
      const image = await getImage(path);
      const pixelsCSS = await getPixelsCSS(image);

      return {
        src: path,
        pixelsCSS,
      };
    })
  ).then((values) => values);
};

export const getStaticProps = async () => {
  const images = await getImagesAndPlaceholders();

  return {
    props: { images },
  };
};

const GetStaticPropsCss = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => (
  <Layout style={grid}>
    {props.images.map(({ src, pixelsCSS }) => (
      <div key={src} style={gridItem}>
        <img
          aria-hidden="true"
          style={{ ...gridItemPlaceholder, ...pixelsCSS }}
        />
        <Image src={src} layout="fill" />
      </div>
    ))}
  </Layout>
);

export default GetStaticPropsCss;
