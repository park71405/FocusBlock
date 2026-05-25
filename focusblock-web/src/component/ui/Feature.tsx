interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bg: string;
}

function Feature({ icon, title, desc, bg }: FeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center`}
      >
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 text-lg">{title}</h3>
        <p className="text-gray-400 mt-1">{desc}</p>
      </div>
    </div>
  );
}

export default Feature;