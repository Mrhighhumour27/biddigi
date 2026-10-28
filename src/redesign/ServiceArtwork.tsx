import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { MediaPhoto } from "./MediaHero";

export function ServiceArtwork({
  kind = "publisher",
  name,
}: {
  kind?: string;
  name?: string;
}) {
  const company = kind === "company";
  const publisher = kind === "publisher";
  const photo =
    kind.includes("jio") || kind.includes("sony")
      ? "sports"
      : kind.includes("zee")
        ? "culture"
        : kind.includes("youtube")
          ? "app-editorial"
          : kind === "advertiser"
            ? "lifestyle"
            : publisher
              ? "editorial"
              : "entertainment";
  return (
    <figure
      className={`service-artwork ${company ? "service-artwork-company" : ""} ${publisher ? "service-artwork-publisher" : ""}`}
    >
      <div className="service-artwork-top">
        <span>
          {company
            ? "CONTENT / CREATIVE / CONNECTION"
            : publisher
              ? "YOUR CONTENT IS THE STARTING POINT"
              : "A CAMPAIGN IN CONTEXT"}
        </span>
        <ArrowUpRight size={18} />
      </div>
      <div className="service-artwork-scene">
        {company ? (
          <>
            <div className="service-brand-plane">
              <img
                src="/favicon.svg"
                alt="Biddigi orange emblem"
                width={180}
                height={180}
              />
              <span>Biddigi</span>
              <small>A PRODUCT BY EXPOWORLD</small>
            </div>
            <div className="service-company-line">
              <span>PUBLISHERS</span>
              <i />
              <span>BUYERS & BRANDS</span>
            </div>
          </>
        ) : (
          <>
            <MediaPhoto
              name={photo}
              eager
              alt={
                publisher
                  ? "Original editorial photography with an illustrative publisher ad placement"
                  : `Original illustrative ${name ?? "campaign"} viewing context`
              }
              sizes="(max-width:900px) 90vw, 500px"
            />
            <div className="service-artwork-caption">
              <span>
                {publisher
                  ? "FIELDNOTES / INDEPENDENT STORIES"
                  : name
                    ? `${name.toUpperCase()} / VIEWING CONTEXT`
                    : "TRAIL SUPPLY / ORIGINAL CAMPAIGN"}
              </span>
              <strong>
                {publisher ? (
                  <>
                    A different
                    <br />
                    point of view.
                  </>
                ) : name ? (
                  <>
                    Your next
                    <br />
                    viewing moment.
                  </>
                ) : (
                  <>
                    Leave the
                    <br />
                    ordinary.
                  </>
                )}
              </strong>
            </div>
            {publisher && (
              <div className="service-slot">
                <span>ADVERTISEMENT</span>
                <MediaPhoto
                  name="product"
                  alt="Finished shoe advertisement alongside editorial content"
                  eager
                  sizes="(max-width:900px) 40vw, 200px"
                />
                <b>
                  TRAIL SUPPLY
                  <br />
                  Leave the ordinary.
                </b>
              </div>
            )}
          </>
        )}
        <i className="service-aperture-corner aperture-top" />
        <i className="service-aperture-corner aperture-bottom" />
      </div>
      <figcaption>
        <span>
          {company
            ? "LONDON, UK / MUMBAI, INDIA"
            : "ORIGINAL ARTWORK / ILLUSTRATIVE EXAMPLE"}
        </span>
        <ArrowDownRight size={18} />
      </figcaption>
    </figure>
  );
}
