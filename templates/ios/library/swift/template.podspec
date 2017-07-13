Pod::Spec.new do |s|
  s.name             = '{AppName}'
  s.version          = '0.1.0'
  s.summary          = '{AppName} summary'
  s.homepage         = 'https://github.com/nanjingboy/{AppName}'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'Tom.Huang' => 'hzlhu.dargon@gmail.com' }
  s.source           = { :git => 'https://github.com/nanjingboy/{AppName}.git', :tag => s.version.to_s }
  s.ios.deployment_target = '9.0'
  s.requires_arc = true
  s.source_files = "Source/*.swift"
end