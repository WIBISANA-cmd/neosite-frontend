import { useEffect, useState } from 'react';
import Button from '../components/Button';
import SectionWrapper from '../components/SectionWrapper';
import { api } from '../utils/api';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api
      .getServices()
      .then((res) => setServices(res.data || res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SectionWrapper
      title="Layanan NeoSite"
      eyebrow="Menu Layanan"
      description="Paket fleksibel untuk website bisnis, kampanye, hingga aplikasi kustom."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.slug}
            className="reveal-card flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-white">{service.name}</h3>
                <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs text-cyan">
                  {service.estimated_time || 'Custom'}
                </span>
              </div>
              <p className="text-sm text-slate-300">{service.description}</p>
              <div className="space-y-1 text-sm text-slate-200">
                <p>
                  Harga mulai{' '}
                  <strong>
                    {Number(service.starting_price).toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    })}
                  </strong>
                </p>
                <p className="text-slate-400">Estimasi: {service.estimated_time || 'Diskusi terlebih dahulu'}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="primary" className="text-sm">
                Pilih layanan
              </Button>
              <Button variant="outline" className="text-sm">
                Konsultasi
              </Button>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
