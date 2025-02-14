import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGalleryComponent", () => {
  it("should return empty dom", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render a list of images", () => {
    const imagesUrls = ["url1", "url2"];
    render(<ProductImageGallery imageUrls={imagesUrls} />);

    screen.debug();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    imagesUrls.forEach((url, i) => {
      expect(images[i]).toHaveAttribute("src", url);
    });
  });
});
