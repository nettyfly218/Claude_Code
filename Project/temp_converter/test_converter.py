import unittest
from converter import c_to_f

class TestTempConverter(unittest.TestCase):
    def test_zero_celsius(self):
        # 测试 0°C 转换为 32°F
        self.assertEqual(c_to_f(0), 32)

    def test_boiling_point(self):
        # 测试 100°C 转换为 212°F
        self.assertEqual(c_to_f(100), 212)

    def test_minus_forty(self):
        # 测试 -40°C 转换为 -40°F
        self.assertEqual(c_to_f(-40), -40)

if __name__ == '__main__':
    unittest.main()
