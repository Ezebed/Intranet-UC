<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Intranet UC

[Inserte descripcion aqu]

## Iniciar laravel en local

entramos en la carpeta del proyecto

```bash
cd Intranet-UC
```

realizamos las migraciones de la Base de Datos MySql

> [!IMPORTANT]  
> En caso de utilizar la version de mysql 5 o inferiores se deberan agregar las siguientes lineas de codigo en app > Providers > AppServiceProvider.php.

```php
use Illuminate\Support\Facades\Schema;

public function boot(): void
{
    Schema::defaultStringLength(191);
}
```

> [!IMPORTANT]
> Copiar el archivo .env.example y borrar la extension ".example" y proporcionar las credenciales de la base de datos deacuerdo con las configuraciones de su equipo.

```php
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
una vez rellenada las credenciales y configurado la AppServiceProvider (solo en caso de ser necesario) migramos la base de datos

```bash
php artisan migrate
```

iniciamos el servidor local

```bash
php artisan serve
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
