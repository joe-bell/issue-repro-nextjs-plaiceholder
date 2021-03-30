import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImageFilePaths } from "@/lib/get-image-file-paths";
import { plaiceholderCSSMap } from "@/pre-build/plaiceholder/css";
import { Layout } from "@/components/layout";
import { grid, gridItem, gridItemPlaceholder } from "@/styles";

export const getStaticProps = async () => ({
  props: {
    images: getImageFilePaths(),
    plaiceholder: plaiceholderCSSMap,
  },
});

const PreBuildBase64 = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => (
  <Layout style={grid}>
    {props.images.map((filePath) => (
      <div key={filePath} style={gridItem}>
        <img
          aria-hidden="true"
          style={{ ...gridItemPlaceholder, ...plaiceholderCSSMap[filePath] }}
        />
        <Image src={filePath} layout="fill" />
      </div>
    ))}
  </Layout>
);

export default PreBuildBase64;
