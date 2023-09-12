export default function Hero() {
  return (
    <div className="pt-[105px] pb-[89px]">
      <h1 className="text-white text-4xl lg:text-6xl font-bold italic mb-4">
        FÓRMULA 1
      </h1>
      <p className="text-white text-base lg:text-2xl max-w-4xl leading-relaxed">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat
        tempore reiciendis qui maxime itaque.
      </p>
      <a
        className="mt-10 bg-[#DA2535] w-full lg:w-max text-white text-base p-3 rounded-md block text-center hover:brightness-150"
        href="/standings"
        target="_blank"
      >
        VER CLASSIFICAÇÃO
      </a>
    </div>
  );
}
