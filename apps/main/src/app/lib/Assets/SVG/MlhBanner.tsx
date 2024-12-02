import React from "react";

const MlhBanner = ({ className }: { className: string }) => (
  <svg
    className={className}
    width="153"
    height="268"
    viewBox="0 0 153 268"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="153" height="268" fill="url(#pattern0_247_1502)" />
    <defs>
      <pattern
        id="pattern0_247_1502"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_247_1502"
          transform="matrix(0.00254598 0 0 0.00145349 -0.000284998 0)"
        />
      </pattern>
      <image
        id="image0_247_1502"
        width="393"
        height="688"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYkAAAKwCAYAAABtQINFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAADyfSURBVHgB7d0LkB3VfefxMxoZ6zEasZVgI4Fk4S3AtkQttgV+hBiJpIyNKhLOWghMMAKkGEO2kGAR2WCMFBlXIYqHs7GMVwKL2CxIcsVIW8LgOGZ4mdjCmFoENjgxCuLhyEktmpEYAdbM9v/OnFFPT597+5zbj9Pd3w81NYPmce/t231+590dKiX9/f2DCgBQqIkTJ3aoFI1TAAAYEBIAACNCAgBgREgAAIwICQCAESEBADAiJAAARoQEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAiJAAARoQEAMAozZDYrQAAlUJLAgBgREgAAIwICQCAESEBADAiJAAARoQEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAarzDK4P4+9fajD6mB37yqkMy4o6c3PjqPP1F1dE1RWfvJL/aqX770/1TvgbdVu7onv0Md83td6o/nHqMq63d9quM/epQ6+JpKxfgupbpOVINTP6yK1LHvZ0rtfz54fftVKrpOUIO/N09hNEIiou+iJQREGyQo3rn4fHXEpxeqLPzPv9/V+EjbhWeeoK694EOqijp+dp5Sb6YUEOG/+5+vUoPHfE4VoePfe5R67iqVto7JQVB8+B6Fw+huCpFWBAHRnkO/el698dUvq97FZ6m3vr9dpe0ffvaKysL3Hn1RVdKBFzIJiIbf/B9VmJf+l8qEHK/Xf6ZwGCERIiGBdEjY6rBIM3j7DrylstD7RvtdVz7q+F2G5/ShlLp5XLzdq7LSkVWo5qS/v3+WShEhgUxJQOz/b8tooQElRUggcwQFUF6EBHIhAXHgr1bSpQeUDCGB3Mig9ptb71YAyoOQQK7e3HI3rQmgRAgJ5EoCgtYEUB6EBHInrQkA5UBIIHfSmjj0z88rAP4jJFCI3/38SQXAf4QECsGaCaAcCAkUYrCPGU5AGRASAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEbc4zoH7/jD+Y0PWwfvvD3V9QQTLr5UjTt6urIld5gDUE+ERA46jz9RHfHphcqW3CM6zZAYf/JcNf6Dc5UtQgKoL7qbAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAiJAAARoQEADcHXw0+XlO5k8d9s4DHrSm25QDgrOP//rlS7/4TpSZMU7mQgHjlHoX8EBIA3Emh/a/fVKguupsAAEaEBADAKLWQ6Ojo2K0AAJVCSwIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgNF4BgKvfn6cG3/vflZowTeXi4Kuq419uVuo/ehTyQUsCgJvxU9TgB27OLyDEhOlq8MTVjcdGPggJAG6KKqjlcTu7FPJBSAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAhjWe+BtBWA0QgIYdsN3nlIARmPvJmDY9x59Uf3wZy+r97/nPynfLD3zRPXHc49RQN4ICSCk74231U9/sVf5Rp7Tk9/8r6p78jsUkCe6m4CS+OFTLysgb4QEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhITHOrqmKB9k8Tw6pvjx2sqke5L9XekGx2d4nDu7VBUNVvR1uSIkQsYdPV11Hn+iSts7TpuvXLzjD91+L864adPV+A/OVS6O+PRClbYjPuX2N//0E8epOjrm9yer9890uPf2O6cplVVQdKV/rSR2dPrnZIMcqyJfl4c6VEoOHjz40ODg4DxVcgO/eVW9/ehDanB/n0rD+JPnOhfOQp7LoX9+XrVDWgJS0LfTInjr+9sbxyYN7R6Tv3/0RfXKbw+oOvnTPzxOHXPUZOXk33tUxyv3qFR1naAGj/mcUhOmqaJ0/MvNSu1/QaUmCIjB9/x547WV3HETJ07crVJCSABAtaQaEnQ3AQCMCAkAgBEhAQAwIiQAAEaEBADAaLzCiL6+PvWlL30p+Lw/8e9Mnz5dXXbZFxufw7Zt26aefPLJpr87d+5ctWjRItXKzp071Te+cfvI/9955x0q/Jy/853vqFdfbT49df78+eqMM84Y+f8f/ehHwe/drVo58cQT1Re/+EXV3Z1s+uwVV1wxcvz+7M/OH/WYUdddd51K4vzzz1fve9/7Rv5fjsf27dub/k7csZVjtX79N9T+FtObo8dKfue11141/l3T9+U9+cY3vqGSuPrqVS2PcfTvRX8n+n1538Lnpes5mfR1hJ9Pq2MWfQ8XLlyoTjnllMbX4fMi/O/y/Ldt297yeZxxxvzg3PuzUf/m+t6DkBhFTqQf/eghZUtO+K1bt45cIHIyf+lLrQvA++7b1njM6Akd9corrzYeI86NN65rPF6Sx5Jw0RfcL3/5vPFvhsnPPP/886OCqZnw8ZMLvNVzSuLDH547EhI2x1YKNykotc9+dnHLMBXTpk0fVVBIwaqP1eCgGlPgmb7/yiuvJH6NSYI4+vfCBajp+zokXM9JOV4XXXRxouMWfg3Njpn8rSuuWNF4HCHv7dq1p4x6Dpq89/ol7tz5ZOJzVv52Gu896G5KhZx8zz//y5H/T1Lb0eTEb0eSi6bdx7J5jKxJuCUVLmzkPUpSSFSV6zkpwZPmcdOhowPimGOOUV/72m0qbbz36aEl0YTU0qQmJjXpX/5yKATkpJbm81Cr40ct/4Z011xwweiWgjR79UmrL5Y0SI1MHi9MnmOrx5gyZcqY1ky4JpgHqb1Fn7t26qmHa5nh1yLP+5prVo36WSkMkzxveQ/lvYzzvvdlsy2DHOMphj2rot2VWWrnnJTumO7u7tjvdbVY0S9/N9wqkWMhLVTX1x7XopNQa6WI977MCIkmpLl+9tmLGheQDgk5wb7ylbWNEz1JSMgFFT2ZpSDLomYjF7CMj4SdeebORCER/T15zXmGhDx3OdY25HmP7etO1lqS1xvuqsmDFMx5hoFJO+fkX/7lNc6vQbq7wo8hLQjXvyW/J9dhmJyzScZOinjvy4yQgBek8IgLJanx+VCwpkEqGnE1XdcCSyYzhAd/e3vTa5WmTQrwcKVq1apVFNQlQUhkTGrx0cKvr69X+Sb6HPPuw5UaYFwlcO3atU1bGGk9b3mfvv3t74z8v3QNJZ3RlZQM1sZ58MEHnIJQXrtLYy/vczLa5SktwD/6I38Gh/N478sstZAYGBjY19GR2n6BlSG1x4svvqTlz8mFJDOVtPBsqaxJwZrkOfomzectBUW4q+KUU+ZWtqab9JxMS7S7c2iq+XWJZ8xlrU7vvYvUQiIIiNcVnElXQbgWLPO5fanNhNcoZMU0cB0etC4708B1l+MW7nK8woPIUtjpsTMfyeuXNT1iqBW0k8K4BOhuypgUCtFCVi7kNGc1pUF3d8jzCj83Gai/4YavqKy5DFyLaCEjQZtkhksR0h64lpld4dcvhW6SFkIR56SMQcjrl5mCuqtLWhN5tpjhhpDImFyM0Wa1XMitZg7J4iddoLRaJavJBRhdWJf0wpd+cSGF7Jlnfmrk3+X5uxZs8ryjPZBSQMUtVjINXIsTT3xfbEEizyt6bKXgSRIS0dk8SY+TFKbRY5w0lEwD1yLPGrXrOSnC52XU/PlnxL5P8n7rKbdf/OKlI48jx//uu78zatFbHlzf+7oiJDwls0FsybhGkmm5zUgBEO4WkM+yzYFLITa0jcLYFcdxA7WmgWvRavDahem5tSJBnGTlchzTwLVwHbzOW7Pz8sEHT4kNiXAXm5xH8qGDQv6etCLz6NLUXN/7umLFtSfe//5kF0l0EZBpUVD87yYrhGQeefjCDu8bVVZSAJsWssUJH1fTIr84MuhZJVkU3tH1DevW3aSy1M57D1oSY4Rrc7pWJIWr/vdwQWuq+cm/6+9NmdKV6PtSEMnFI1PxTM1f+R1ZzBQmv5Oki0VaB+EFVOHXFKUX1+lpgfK3ZZFakgIwSW3YdqA2XDsNH7u4i7nZ97/1rTvVtdd+qWX3ghyr8OuQYxE3bTRKjm/4GJtWJkfJ8U5yTOTvNTu+zb7vck7q5yaL3qTG3+q4hV/D6Pdh+pjHkvGU8PklLWDdDRl3DY79m2Pfe/nZtN97pHiP6/7+/k3BpwsVAKBI3OMaAJAPQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBABUSGdn55EqRYQEAFTIoUOHCAkAQD4ICQCAESEBADAiJAAARoQEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAKBCBgcHF/X3989SKSEkAKBCOjo6VgSfHnrzzTevTyMsOlSb5EkMDAysHjdu3IUKAOCT3UHZvCkoo++aOHHibuXAOSQIBwAoDeewsA4JwgEASss6LBKHBOEAAJWROCxahgThAACVtin4WGMKC2NIEA4AUCubVExYjAmJIBzmBeGwlHAAgFrapEJhMRISEg7Bp+uDj3kKAFB3m4KPNR0HDhw4O2g1XKEIBwDAaD3jOjs7lyoCAgAQY9zg4ODrCgCAGOzdBAAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADBqOyQ6OjoUAMA/Uj63W0aPV2165zvfqQYHB9XAwMDIh/w/ACBfOhQ6Ozsbn8eNG6feeuuttsrktkNCPzF5UvIhCA0AyJ4OAvnQX6ctlZCIahYa+msAgJ1wKOhgyFomIREVFxrycejQIUIDAGLorqNw91ERY8C5hESUfrG6aaRDI9zaoIsKQJ2Eu4zyaiUkUUhIREVDQ9BFBaCqomFQVCshCS9CIo6pi0oHBsEBoAzKFAhxvA2JqPCBjQZHODTopgJQhHAA6FDQ/15mpQmJOKZuKlocALKky51wGVTVhcWlDok4zVocBAcAG+FKaJVaBzYqFxJx4oJDRIOD8ADqiTAwq0VImDTrrhJ6HYcgPIBy0wU+YWCn1iERJ9zqiIaH/kzLA/BXtFVQxhlFPiEkEtInWNz+KHFjHoIAAdIX1yIgCLJDSKTANOYhCBDAXrgyFu0WJgjyRUhkLEmAiOh2JIQIqiquJRD+TAj4hZAokGn8QwuHRnj8I9w6AXwS7fYJ/3/431AehITHon2s0ZaIiAZJNEAIE7QrWuCHv6bwrz5CouSSDtaZgoNAqZ+4Qj/8/9FCn8K/3giJmrCd+REODv057t/iPiN7cYV73P9T4KNdhARitVOoxIVG3NfRUDH9fNz/+y7uuEUL8rjvxf1Ms98DskZIIHV51VqbBUfaodLqtVB4o6oICZRWs4KZQhtIxzgFAIABIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAiJAAARqXfu+mlV/9N7Xl1b+PrGdPfpWZOf7cCAKSjlCGxr++Auv3u7eqe7T8cCQhtZhAUc058r/qDuSepk048rvEZAOCmo7+/f1Pw+ULlaMKECSpPzzz/a/X5lTcELYi9iX9nKDAkOOY0WhvyNQDUwVtvvaUGBgaUo55ShYQExKJlf9VoSbRj6pTJw62NOY3AmBO0OOimApCU7uYuQ09FrULig2ddYtWCsKG7qSQwTgveePlawgRAvUkgPP7kLrXr+RcbFdVdwYeuqG7f+FXvg6LdkCjNmMQ92/8xs4AQ8rfl4/6H/kmtU/c0/i0cHLQ4gOqTwl/KgLhAiLMj+Nmqj3uWJiS+GQxU5y0cHJoEx7kL/1idt/AMAgOomNvv3qbW3X5P4p+XMKm6UqyTkCSXVPeBhMa62/93Y2xklyfPCUA6bLuY61AGlCIkHn/yGeUbCYuFBAVQKbYzH6UCuycYs6iyUnQ3PeZhSAg5QS5YeYPq2fw31jUQWechAaOn5DI1F2hNrjkZSJZuHvmQr6WXoXd43EDGEOU6+sL5f+LUHTzH4Rp8LBjUPm9hdbueSxESPvf7SYtC+jGvufRzVr937U0bYv9dz6o6HBzHqe7h/wfqQIJgX9/+4RDY26hMPRN8LTX2VtPfpddBPuSaXBVck9dcep6yIdeeXHd7LCbJSEidp/5IVZX3ISEnhY/dTWEyqG4TEs3GV3T3VdxrNgWI1JiYrosyCbcI5GsdBBIOe1KaxShjhxIsf/vXK6x+T64vm+dQ9cFr70PClwHrZoZO8hcbU2STcL0ImgWIXiA49Pm44HMXIYLCSVfxrkYrYG8jFKRlkKRFkBaZOi/Xwg1XL0v8O1IBs1H1cUnvQ8KlFfHtW68daYE80+i7zP5NlBpQUlkEX7jFFZ6yqw01o9890hLpnjKpER4ypZeNEZE2GXOTmnxeYdD8uWxTZ83/SOL1DLKY1mbKvW0lsWxKEBK7rH5eCsGz5n+08fV5C4f6CcPN2ccbNZtfZ7owr5UimqeNft4mLZFmK0f18ZNWydThlgmq56XhGr4MArtWHPRkDt+6iG0WvbkMXkvFj5AoiG0rIO4NloJNThD5uPT8hY1/0wWfbg63GxzSpE1qT4EBZSInuekikkF2abaHhVsm+kMKFjkOQ0Ey1GQP/xuK9djwoK4+/14a7gIS0XNS3q9fP3qvsiXrh3zsIv5+EBJfvXp5op+d2ThnJ1u1guS46kpp1XgdEnJS2zZXk6Z5ODg0HRx/8eXbrAJDjwMk5eNF1KzWGHcswi2TpOQ4dYdaIocDpqvR/RUOk5mhfmHdR1yHsNEze/TXemqnfg/093v73micczYFkxTgNs9Dxg5mWLQmbrz9Hm/HEOX4yWtKev5IZdOmNVTlwWuvQ8JlLOG0NvZR0cEx1CpIHhI2zVNfL6JmF09vSv3KQwXcgbZbUpeev6jpQKQUVnELnOIGJKWQbbf7TLdGdeEdNz6lX7v2UuT5uR6T0xrb3yd7/ra1433Ba5mR+GcPqHu3/1D5TI7x1ISVOQlgm5B4ZniPpypWYrwOCdvxCJHGZlvPWHdxJW9F+DCQF2dmkxkdL3m2olRuNmUKCSmwZcA0qXuDbrSf33+HcuHD4KxNQd5tGRLyvic9t6VAfcnDbtQwm3EDl3VJu5p02ZaZ19ty2A5+nZTC9t4uq7tnWkyZ83W6XLPaqG/BVnRtTY6HbMkiYzVFHxubWXVHWoybDf3t5K+tDFPVbZ6jyyB0GY6BC29bEs+02KI3ju385jguhbhNrcPH2lazQtf32mERfBqclffnDxL+rFwfNs/bpgWZx3mit66R7kH5+pt3b7N6XJsuPV3htCmDqjou4W1IuEyhkzvNtcvlZLcZk/DxRGo+aO3f5mVTLWvEaZJZXmWtMXZbtsBsCtWZKVTQhA6C8OJQGXfpjpm0IO/DS5FZd83YlilyXdi8177vDOHK45CwH49IY38j20Jcz9BJ/vftChhZ8yFNX72PTRarVbtzGLROU3eB3U024x15sOlusu2msznPXLoAZQLC0HoMvcWM3ew122DSkweSPsbs4DnZtbz2VnLw2tuQcOn2SWPQyLY2YNOKiM5wSUJCIjrNUU/V1ffZkBk1unvO5bg1u9h8HWg3yXINymMeDs5mWZDbtSTsZ4ituvS8tgpUl8e0GVyW4LJdKVLFwWsvQ+IZh4VtRcxqElmvj4grwPVUXaFXl4ftGd4jJy5E4loizY6dj91NRfFx0oFNSNgWqjatFJfxQJspqXFcB5eTh4TbymtCIgcu/fZpLIl3eVybdRm7nELI/kSd0RjYGyoQ4kJEPxfdNG72GD62JNJsztssFvPxWGTZHWi3oNR+nMhmim0ct5ZE8mvc5dqTbnLpRqsSL0PCZQDotIJaEjYnqm3ryHa8w0bSC8DHLUTY4sONS20/aR+7y8B1u61Ul3s/2ISE29+v3jRYWhI5Pq7t3/dhIz2XMRTZH0uPv4T3BgqPyZj2DEqiu+mU3fp0j4U3s0zC5XzqDbqckoaybYGaxviO7b0fbM8P6Tq612IGlZ5cMsODazct3oWEHGTbGv3MlLa6tq0F2PZZ2v79NNZ9tMv2opLQdOmT1dtohAuO6H5FWpk2UtP7VR3+/9EzeMI1cL2HVfTnZo7sXXW4ZZlXISTvQdLHkmtwT0brFkxmOMxwsinEXQavZbdpQiJDefXbR2W9eM9lZpMPWw/bXsiuYa0vqvDFlXSRmK+kcN+28avebK3u1iVkt1jPRhpdMy6vyaYQd3nvZBacTQvPd96FxGMFLaLb47SILtuZTd9/6CeNz9HFRXlxGahlvOCwGY2bOvlVo7Tf5M+PdRgmLsfXpnXs0iqu2spr70LixwUtonMJJ5vHdZmF8kzjRkmjw0Xfx0F3senFSPomMWkW0i79+z7sq+SLPR6Oj9hv8pfdqmuX7cij5jhtxGc3eG2/PUe1Bq+9Cgk9r99WGvOSXdLfphbzWEpL9vV9HEwnoilEXJq/bi2J4rbMEGVb/Jc32eRvj8U2+L0ZrsMQNrvYCqm46N0H9N0mbdle61K+xN0S2CSN8POJVyHhtl9TOgtXbNPf9kZDeU0lNYXIF85fmPjOXFqvU0hMUvCX/SZ/yc/bGU7jA6O379aTFA5vQzN09zz5ubSuIdsWssvreizoETlvISGROpfadhqDuy6D1rbN3KLXG7gU+C7dTVWa1VFF9pv8JT8HXFqRsmGiVA6fGb5pUx7Xif0MJ7eV1+epdGbhyd+SRXpybNrdysSFVyGR9Ypnk6wHrUXRO4e6LqSytXD4Fpkzh+9tHb4tafi+10M/k36g+LghoU+yHFx2mWkkAfG4yp9NTT/PwWvd5S6h8HjjjoejK7CDwX+2PQLt8iYk5EA8XlBLIusbDfmwtbTbLBD78NTvoc2Fr9cShNcGSO3Npdbk05hEFbY0cZkW7uMq/SibVvJQhSebwWt5HhIIEiqPDYdC87+b/8wpb0LCtSCVG8BI14+k/UmOC7lcDrxNE9SHi8allpfrOIp0AYQGVCVspAKQ9cI5m0KzzIGluVQWbLpmbBfUFcX2OUoZY1OJ1ZXecHmkWwlS3jRaUMGH7TmifyfPLidvQsJ12thLjYGtvaNmHwwFxnsbhYx8tCrQs17A50NLwqW/uA5dN3YhUezMraLYzEDyYZeAJOxvCXCc9e/8xZdvU+cGlRwJJGklpBWeeW9H7lV3U1p0Smt6IdpJjRbHnJG7Xwm9pbYN3fxMyofFNS4X7+sWC6mywMK89M2Y7rYRX9Ju3bK8Z7Y3CHIZvJbHWHf7PSptj0VaKFnzJiSyPLl0008+br9728jjua5gtp3BU3Tz23U3WR+ety0GrptzW8uQ7eB1UWzuZ+HDFjmay1072+FNSKSxatqG60C5yHpmk1xoXzh/UeMkbueOc4f/Xj6D1j4ouvVTRXaDvOWZAh1do9GMT68rfC+YPHgTEnocoQw3mbeZdvuM43iHbLcdpe8499LwAqM9ka9NXO4Jvc+DwrYKYwC+rbzNegJDXmMSustY7yrwzaCHwLZiY7OWQQpkX8onXWnMq8vJq3USMuXxgpU3KN/Z1CpcxlpMF5q+45xpV864EJHHl+Nqy4eZOazezobtdE67v51esEeDYGbj/4+LDV35d71GJynb7tTZwWP4Uol9pq4hIfsLXRMUaDdmMNiTJrsbDaVzX+skWoWIjTJMY4zDmERr3dZz/pNPvHA9d6XAk+nOQzX246xbXy6tNfv7x9jfWyIreU6G8W4X2FWXfq7x2degsB07ebygXW3b5cMd3mZkPMhaV7ab/Nl2PbosqNu+8auqHS4L3vKY4ZQ2PeHGpXfAlZe3L5WgkJqFBIXr4HJWXO6EZcuHGSIuz/tv/3rFyIUqIdPb90ajgNGL5fTmbb19rW/AVKZZMmVju8mf/RRx+wV1aQzEyuPadgfZzXDKPyT0LWrlsU+bO6eQ5+BlSAgJie0bTxpZKCdhobcHLpLtltsuz9eHgU6X7iY5NjYXuhQMvaEQ0f8mHz5NOWyH7VbYeeh2WDluU4i7DF7b3EvbxGXMwGaG09A2/NluOzIUBic1ntNpjTVdxZcF3oaEJjVKmemjZ/scXvOwa3iJu/0Oru08F5ttIvb12d+y1IcmrcjjrnR6/YZvhWiafJglFuW2/iR5Ie7y99O4L7TbrUztdmuV6zOtkJDjJJVhvaVQ3neeTMr7kIjSza9wjV7ffERvOZxVa0OPlyTlMhOi25OTpLfPfhV60VzWdpRlG4k0uRREcmyT79/ktqq7XTOdBq/tBoClhm9zAyItvOuDT62EJEoXEnHmNA78e0dq+XoesQ6ONLqpZNaV7WZzbntC+dHNYnvR1nVfozJyXVyZdNZcUYs3Xa4d+xlOyVr64W4j3Uooq0qERFS4GRfupnIJDqkVyYCsy5xklxPflwFb2+4mX1pAyIZNt5nbmET7XcauW47YjLfElQNDLYTjRgaXZ6R8r/miVTIk4rQKDvmsF6FJrVjedOnSkp93fcOz3oI8Ky7hxmZ88Wxq4GF6Jpj+ujc0Q2zo7w619GQGme2W6m6b/CU/J1xalWnM+3cdWJZKY9IJKfIY37712sb7UPYWQlK1CYk44eDIgkt3kw/dNi79wz6EhA9rO6KuvWlDow9bH5/oZIbwc04yNdhEWqBJz2OXGrdNTb+oMQnhMrBs+9i2MxzLrtYhkaV9jhe8D2MSLk3/Og4AJyHngMtApy3XFktSWd+hzrbbp9nj2pBAq1uhb4uQ8Igv01/L2pJAMnncpdBlQZ3NwjYT0zU01BX17pEuomb7QGE0QiIjclL2bP5aYz2H3vK71ZoOXwZ/3dZIMLupSPaz0ey2sHDZmsOWzc2NTKRVcOn5i0aeg8/rD8qCkMjQScPzosP0YHn4frdDe8jsj90evAhlnpWFZGw3+bM9J9zWYrQ/LiGPe8PVyxTSQ0jkTA+WC1/7Qsu6k2rWO9f6vFWI7Wu33eRv6DH+LdMFdftKet5VHSGBMcq6KWHWZg7Pf69CYWa7yZ+w2Yeq1QyqGY1dW4emmsvnOcNTzuEfQgJjuDT7u2swJiEB8YWgS3Cdh9vY23YHdTt2ByVtTQ2tR1rU6EYdumHQu53vFYFiERIYw2VmSlkHBm2ftxR8927/x9LeA1xz2YzRpruNsYHqICQwhtwARg+uD90bYmhgXd8O9fD9Ioa+tt3TKituU3ftWkB6xa3cKtOnbifbcaQFQdeOhJ2QVoVUDHSXoa75i5nDtw2VliIzhOqJkECsOmw34EqOTc/mv1GLlv0PL1oUQzsjf8Tqd6Q76NeP+nIzTviMkEBlSO34/od+MtLqSeIkxxlLUrv++f13qHuC2ri+KZapZSGFeHQMYGqkZh4e+JfvdU+ZNPzv7x7zM/oztXvkoaO/v39T8PlC5WjChAkKKIs9oS4pClnUwVtvvaUGBgaUox5aEqgVZtYAdsYpAAAM2g6JQ4cOqcHBQQUA8It0M7VbPrfd3fT22283Pnd0dKhx48aNfMj/AwDyI4EgwaA/0qjApzYmIU9GWhXyIQgNAMieDgbdq5N2z05mA9eEBgCkL4vWQjO5zW4iNADAnm4dSNmZRyhEFTYFltAAgLHCoaBbDUXyZp1EXGjoj87OzpGvAaBKwt1HPoRClLeL6cIDMHGtDf01AJRJ3mMK7SrViutoa0OEA4NuKgA+0ZXdaGuhTEq/LYdumsV1UxEcAPJUtlZCEpXbu8nUTUVwAEhTtHWQxRoFH9Rigz+CA0A76hIIcSQkeoLC8b8EL/hkVSNxwSGiocGsKqA+dJkQ7jIK/3sdBK/19aD8uyv4fN/EiRN7Rkq//v7+WcEBOTn45tnB/54efMxSaIi2OggPoPx06yA8sFynMAiLBkP4e8ZSTkIj+DQvKAgXDbcyZimMQngA/guvPahr68Bgd/BxV/DREw2GsMSl2f79+6WVMS/4WCQtjqAgPFIhVjQ8BGMeQHbC3UThlkH4e2jYrRIEQ5hzqRW0NOapoZbG6cGbME8hEVofgLtoq0B/JgjMgrKlJzhG24LP0pW0W1lKrWQiNNpnaoHo7wFVF24RRD8TBMnI+EJnZ+d9b7/99sOTJ0++Lyg7XldtyKzkCUKDdzRF0RZHuBWivw/4rlkIhL+P5IYHnZ+W1kLw0dPV1fW0SlEt1klUQXRednjargiHRdxH+GeArETXEBACmZsfdCE93W5roRlaEjViCpLwv4V/DhDhgj1c2EeDgADIXxAQmV+stCRqRF/ESS7mZgESDRNCpVzC73+4sG/2NeqLkEAs220HTMERnblFwKTDVNC3+n8KfP+EbzI0fvx4764JQgKpaLcQiguSpF+b/q3VxdbuxdjqtUa/H/fz0cI87nvNfgblo6fx6tuRhm8yJCHhG0ICXqAgRBVF7yWhb0laJoQEAKQgvGFoWQMhDiEBAJaigRDtNqoSQgIAmoh2GVU5EOIQEgAwLDyoLKrSZdQOQgJA7YTvHxG94xxGIyQAVBZh0D5CAkCphbcHoZsofYQEAO9F7z0dvfUoskNIAChc9M5yevaQbhkQBMUhJABkzhQCtAb8R0gAcBbdNTZ6b2nuKFd+hASAMeLuFWH6GtVGSAAVZtoyPFrDD/8/BT/CCAnAQ3G74kYL9bif494RSBshAViK63+Pft/0e2HR36VQh48ICcBS+G57nZ2dowIjXItn0BZVQEgAbdKhMW7cuNjvR0MkLlQAXxESQMaahUi05cH0UfiGkAAKpLutWoUIi9BQFEIC8Fh47CNOXIiEu7QIEbSLkABKLEmIxI2DmGZmAVGEBFBh4ZlYcUwBQohAIySAGotO540iREBIADByDRFmZlUHIQHAGSFSfYQEgMwQIuVHSAAoDCHiP0ICgLeShghbnmSHkABQWmx5kj1CAkAlJd3yJBoibHkyGiEBoJbYNysZQgIAYrSz5UmVQoSQAAAHddnyhJAAgAy4TO/1ESEBAAVoFSK+GKcAADAgJAAARoQEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAiJAAARoQEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgNF7V2BNPPat+HHyUzZzjZ6nZJ8xSx057lyrKy6/tDY7dc2pP8Nk3U6dMVrPlGAUf3cHXWSrjOSTHZ8bRR6mPfWh2Zsdnw+Yd6paNW1Vv3wFVRecsmKfWrFia+fnlgw6Vkf7+/kHlMSncPvqZy1WZyUUuJ6t85EEu+A2b71dbd/R4GQ5xsjxGDz7yU3XxqptUmWV1fD76mcuCc+S3qspWByGx/NwFqkgTJ07MrAzXatvd9MAjO1XZSS125dqvNy7IlzMutKVm+JE/vTyoHW4pTUCILI/Rrhd2q7LTx+eTn7861eNT9YAQvfur2UqKqm1IVKkZLBfkR4JW0c1B8z5tcpw+e9lqtfrWTaU+Zlkeoyp4Ngg8OT4b7r1fAWEMXFeI1PLTLASlxSA1zCdKOG5jkvYxqprVt32L44NRCImKSbMQvCTob69it4EcI2rMZhwfhBESFSQXebu1fwmaZ3+1W1XVLXdsyXwcp8w4PtAIiYpqpzUh3UwSNFUm4ysr1q5XiMfxgUZIVJS0JFxbE7fUpE+6nWNUBxwfCEKiwrbs6FEuqjA9OKkHHq7Pa3VRxsWmSBchUWEuhb3UHKu6SjbOlvt7FMy2OlY0UB2ERIVJYf+y5eykutUcXY5RncjstjpVGjAWIVFxtjOU6rBSNqpMK8iL0Lv/DYX6IiQqbh+1wJbqGIw2CNF6IyQAAEaEBADAqLYhUYd94AFkp7urHmVIbUNCbtxTB/QnZ2dGgTd9yhNjNmPJfTg+ffqpqg5qe2c6eZNvve5y5wVnWZI9c7gw/Sc36pF7Cvi4IK8qK6WXL1mglp17VqF3Yay7Wt++NM+7utmQgFh82fWlDwrp0puaUZPclxbSMinElhR7d7I4cu7INu9lXuMwY9pRavXKpQrFqnVI+EoujkvOXdC40U+ZyT2mv7t+tcrCMR9drGAm59A5Z52uNm4u75bftB78wOwmT02tyaAYssPkDKSBkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBAAvyZYnKB4h4al9XCBoU9lvyypbi7zMBpWFY1sOD8m+RHfcu0MBruQcKvsmf7Lv1GcvW60+9YlT1ZQpk1Sepk6Z3NhWRjYCrTtCIobUXh54ZKd69oXdQY3+jdw3SZP7UnPz+XKTAlrexyLOIXmsPb/5bSXOIWlNbNhcXIVJtjb51CdOUVctW1zbvaQIiRDZNlw+qrLNMvIlhfKGzferrcE5xH08qkHeU10uyI7RdQwLQkIN1dwvWbWOezjAmVQsVq79OudQhekK5B03rlKzT5il6qL2A9fSlP3kBVdzccPZzRu3NvrOOYeqT97jz16+utGNWBe1Dgm5uMt+zwYUS86hWzZuUaiPxoB6EBR1mXlV25CQZiMXN9ohrVDOoXqSoFixdr2qg1qGhAwqSv8x4ErOoVuCVgTqSyqaMk5RdbUMiS07Hqb/GG2RgGCaMurQkqxlSGzd8ZACXEkrog41SLQmlc2qT5mvXUhsacxhpxUBd7LQEtAeeLja50PtQoKFcmjXgxUvFGDnwUd+qqqsdiHxXI3mNyMbsvgS0GTblSqrXUi89Bu6mtAeBqwRVvXzoXYhwQWOdjCehbrhfhIAmpJts22xxXZ1sMFfhck2x0sWzFeAqxnTjmrcV8HWneuubsz68XU33L6+N9QDwYAzLcPWCAlHjQL4rHm53wwlqamNffBPVccGFzn8JAXw4gXzlK/kHDonOMe7HVoS3V2TG1tr++yScxeoT37+arqgWyAkHN1549U0qdGW765fQ4gXSEJ65tFHqV2ERFOMSTgiINAOKaAIiOJNcWgl1Q0hAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQGgtvpYbd0S23IgM737D6iXPd3gDbh541a1ixtItURIOJIT7KplixXMnn1ht/rIZy5XGEt2H91w7/1q+blnqSqSu/et/Ouvcxe/CiAkHN2ycYvauHmHmtrl594v3V2T1Jmnn0qQeWz1bd9St9yxxetzSM4fOY9sXbJqHdtwVwQh0QbZYtjnbYalFvfxD32AzQg95vs5dPE1N6lf/MMm6+3CCYjqYOC64rhY0S66jOqNkAAAGBESAAAjQgK1N4Ob/6ANVT9/CAmMMrXLz3t2A746dtq7VJUREhjl2OnVPuHjzD5+lgJcnbNgnqoyQgKjfPyDH1B1MvuEWdbTO4Gwj1d8ijkhgVFmn3BcrQrNMz9xigJcSSviWMYkUDfLllRzq4g4SxbMV4Crq5ado6qOkMAYy89dUIvWxPIlCypfC0R2ZMuSOpw/hATG6O6arK66pNp7Psm0xSvZ1wqOpIJxZQ1aEYKQQKxlQWtieYW7nb67fg0D1nAi4xCrVy5VdcEGfzBavfIitW//G2rLjh5VJbdedxndTHAiXUx1aUFohASauvW6yxtdM3L/jLKT13HHulWsi8iBtNJ83t3WluykvCZoPdTx3KldSFTt5G1lagpdKlJzWrxgvlp82fWl3VV2qA95cdtdTFOnsCI9iTUrljbuuVLW82XGtHepD5zwnsYaiHPOmlfrrskOlZH+/v5B5SE5catQK05Cas7/9L31Kk1PPPVso/tJPvteAEjtT+6nsWxJurO1Ll61Tj34yE5VB1Jz/sG3b1Lw08SJEzMrw7XahYSQ/fGr3pqQQnHG0UdlWgOSY+jjvQbyeO0SklUnx4+uOb8REgAAozxCgimwAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAiJAAARuNVDW3Z0dP4ePZXu1Vv3wGVhxnTjlI/+LubVPeUyYl/5/pbN6mNm3coH8jz/6fvrVeunnjqWbVh8/3quRd2qz2v7VVZk+M8+/hZ6pwF8xofaZHXIefOE089l8vr0G697vK2Xoc81zvuvV898MjO3J63HP/ZJ8xSVy1brI6d9i7lQo719bdtSnydLj93gVq9YqlydfPGreqWjVsS/Wy710RZ1CokJBQuWbUuuEh+q/ImjymP/7EPzU78O74EhJDn/3LwcWxwYdj93l61cu36RuGaJylU5DHlQy56KWRtjn3c31v5la+rBx7eqYrQTsFuU/ClSc53+ZCC/spl5zTCwpa8bpuK3IZ7d6gpXZOCxzpHufjBwz9N/LOu10TZ1Ka7SU7Wz162upCAqCu5wBcHxzzvgBj7PH7beO+lsHL7/b3qk5+/urCAaIcEdBEBESXPYeXar6s8bAxarK49BPv2v6EwWi1CQi5yaUHk1bWEIYs9C2XptnjZoUYuBW0ZKxfSgtiy4yHlCwnpDUGXV9bkOt/gUSu87GoRErcEFwstiHxJgeDbMZfCY8Vauz7kofGHYltCLqRi5EMLIuqWO7bkUllrpzWB0WoREjJYh3zdca+fNTkp8G0Kjwct+qh94us5n1ctXx7nlju2KrSv8iFhWyigfb37D6hdwRiQr2wK0B///DlVRg96PH7y7K/+VeVBBrFfznEGWlVVPiSkwEK+9rzq94VpM1OorBWMPo+f93MvvKjyYtu9iLEqHxL7+pitkLdeZogUjlk6Q/Q0aLhjxTWASpNZXnBXyxXXzcgqUZtV0Ul1T5nU1mKuoslzz2rRkKxcbefYPPvC0KKtomV57ixZMF/BjW5NlPn6KxIhEbJmxVK17NwFqozKvEWAXLyyItrVzRu3FB4SsmVGO6+haFc6rIbWZNxGppz6TBby1WELjSwQEiGyzwzgouxbM7huYyFkPYzvISHPURbyLT/3LAU7jEkAqIW8FvJVDSEBoBbYrsMNIQGgNtiuwx4hAaA2aE3YIyQA1Ips+Ml2HckxuylEdvzs7pqspk6ZpNrleiculNPW4Nz5+IdmN6Yit0vOwSzWW+CwL992l7rzxqsVWiMkQvRtTdMi8//Tvn2miUzxO+aj7nPd46xecRFTBhPSNzZKiyzMkzU7eZw7VSLHK8k1LLv7ssAuGbqbMiQnoSzikY8yDpY9+Eg5t8muAlkcKOfNRz9zGV0jFqTQP/P0UxL9LNt1JFP5kEij66hdUrNJs5aJ+tAtFIIiuTVBCzgJNv9LpvLdTb40J6VmKNtHtLOytapk76Wb27iL2hNPZXfPhxnB2NKeggtoCQrZ8vq761crtCbjQsuXnKU2JFgFLq2J766ny6mZyoeEDAJKUPhQY5A52suXLGBQMkIC1IcN+uIsXnB6YzZM0eT8lRYpYxTJXLn8HLX5/odbdvNyXFurxZjEVcvSHdB1JSfs5hQHxpG95ef6E+pbOHcSk8rhsiXJJl3IvcBZYGdWi5CQlsTyJX7M0nmipLfDrCspbG677jLlA19bW75KGvCNzf9YYGdUm9lNq1de5EVQUGMpnzM/cWpjG/mice7YkYC/6pJkvQhs12FWqymwEhSy5/+Mkm/rnBeO02GyZkHuR0DfdbnI+5bkPGa7DrPaLabTi9uk6S7TCtO4B7Ye/CqSNKvTXkEqC7pwmBQ2Usm4ctk56rlfvZjKudO7/0Bjhg212OzIe5ZkCrrv98QoSm1XXEsBmFYhKKEj0zCLnCo5tavct0ctEwmLNFtZe17dSwGVIbkuksxwJKjjseIaKBhTorPnywzHMiIkAFSebk3AHhv8wQsfc9xBdV/Qp//gwzsV0MqalUvVJy9g51dbhAQKJwHRzpYT19/6Lfr00ZKMQSbdJRaH0d2EwrU7CEyfPpKSmWmcL3ZoSQAFe/m136qitbO32R4Pnn9SUiGR7Tp82I+rLGoREtK8zHJ6qlzkPuwUmuV25HNOmKVWe7DqOG9SeP44w80h+/reUA88UvyYSp22spftOlhhnVzlQ0JunCM3b6mDLHe6lb+9bMkCdWzNVmFzH5Dq0Zv/0ZpIpvJjEmmsigVQLcsTbtcBBq4B1JC0Jq7kBmCJEBI5Y2YFXNmcO7OPf4/y1bHT3qV8INNhWWDXGiGRs4998AMKcGGz15jPY0c+bRzJdh2tERI5+/TppyrAhc025Z/y+DyT8QBfsF1Ha4REjpbXcHYQ0iGDrDYhIQXfmaefonwjr8G3a4DWRHOERE7kIr+SkxEOZCziu+vXKFu3eXaDLXkuV3k4WOxroPqCkMiBnIQ/+LubGLSGNSlYZV8rl9q3zODZGoSLD0Eh4xASdL62pNesuEghXuUX0xV5gUg46DvhuZDn7suWB/JcursmJfrZ2SfMUjakMGvHHMvHm2Exu0aCvYiVufK4ck92WcDYTuVC3je57arsOrDx3h2NOzLmSW+qt8xxHML2tbte70OtnMWNuwTa/E7Sa6LMOlRG+vv7B5UnslyJHEdO7BlHH9V2y0EC4uWCt/vQ5GK3eT1Jn7v8zTRmuyR9j20fr4j3QAqfrKaJSuDlFRRpvY6s3ts4Nu+37TWRhYkTJ2ZWhmu1CAkAqKI8QoIxCQCAESEBADAiJAAARoQEAMCIkAAAGBESAAAjQgIAYERIAACMCAkAgBEhAQAwIiQAAEaEBADAiJAAABgREgAAI0ICAGBESAAAjAgJAIARIQEAMCIkAABGhAQAwIiQAAAYERIAACNCAgBgREgAAIwICQCAESEBADAiJAAARoQEAMCIkAAAGBESAAAjQgIAYJRZSAwODr6uAACllllIdHR0bFMAgEwEFfGnVQ6y7G5aTWsCALLR2dmZS0h0qAzt37//5HHjxj0UtCqOVACANB03ceLE3SpjmQ5cd3V1PT0wMDA/+HK3AgCkZU0eASEyn90kQRF8kqC4SwEA2iUBsVrlJNPupqj+/v5ZwafVwceFCgCQWNBt3xOM80pA9Kgc5RoS2nBYzAte9IXBi56nAABjyOSfYFz3ruDzfXmHg1ZISIRJYAQH4OwgMK4I/neWAoAaGw4GaTV8rahgCCs8JMJkNlRnZ+eK4MvTFYEBoEakO2lgYGBbEAybgq+9WT7gVUiEBS2MecGnpUGaLmIKLYCK2h183DVhwoTbfAqGMG9DIiwIjKXBAVwk3VIKAErMh3EGG6UICY0BbwBlNBwMT8vspKDV8LSvrYY4pQqJMAa8AfjO13EGG6UNiTAGvAH4QloNQSB8LfhyU16rorNUiZAIY8AbQN7KNs5go3IhEcaAN4AsSXfSoUOHvjZp0qSesnYntVLpkNAY8AaQliqMM9ioRUiEMeANwFZonKGnat1JrdQuJMIY8AZgUuVxBhu1DokwPeCtCAyg1qQ76Xe/+91dkydPvq8O3UmtEBIxDhw4cHbQwriQAW+gHoa34X7Y5+0xikJINMGAN1BddCclQ0gkFAqMK4KT6mQFoHR824a7DAgJBxIYQViskAV7ivELwHt1m7aaJkKiTQx4A97arTzfhrsMCIkUyYB30JSVwW7u4Q0UgHGG9BESGQhO0CMPHjx4NgPeQPbC23ATDOkjJDLGgDeQDcYZ8kFI5IgBb6A9VduGuwwIiYIw4A0kwzhDsQgJDzDgDYw1vAq6dLf7rBpCwiMMeKPuGGfwDyHhKQa8URd6nKGzs/O+I4444mkFrxASJcCAN6qGcYbyICRKhgFvlBnbcJcPIVFiDHijDNiGu9wIiQpgwBu+oTupOgiJiuEeGCiKBIMMPg8MDNxFMFQHIVFhw4GxVA11R81SQAaYtlpthERNMOCNNAVhIBvqbWOcofoIiRrSgSFTaoML/EgFJMA4Qz0REjUXBMbSICgWBRf+2QqIYBtuEBJoYMAbYYwzQCMkMIYEhrQsZEsQxfhFnewOPu5SbMONEEICTe3fv//kzs7OFYoB70pinAGtEBJIjAHv6mAbbiRFSMAJA97lwzgDXBASaAsD3n5jG260i5BAahjw9gPjDEgTIYFMMOCdP7bhRhYICWSOAe/ssA03skZIIFcMeLdPjzMEX/bQnYSsERIoBAPedtiGG0UhJFA4PeAdDLZKYJysMIJpqygaIQGvMODNNtzwCyEBb9XpHhhMW4WvCAmUwoEDB84OWhgXVmnAm224UQaEBEqlCgPejDOgTAgJlFYoMK4owYD3bsU23CghQgKVIIERhMUKWbCnPBm/YJwBVUBIoHKKHvBmG25UCSGBSpMB76A2L4PdF6oMMc6AqiIkUAtBzf7IgwcPnp3mgDfbcKMOCAnUTjsD3owzoG4ICdRaaEuQxvhF0GU0K7JT7e7h7qOHDx061DNp0qQeupNQJ/8f8BtGUHNT2dkAAAAASUVORK5CYII="
      />
    </defs>
  </svg>
);

export default MlhBanner;